<?php

/**
 * Discuz & Tencent Cloud
 * This is NOT a freeware, use is subject to license terms
 */

namespace App\Console\Commands\Upgrades;

use App\Models\NotificationTpl;
use App\Notifications\Messages\TemplateVariables;
use Discuz\Console\AbstractCommand;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Eloquent\Collection;
use NotificationTplSeeder;
use Throwable;

class AddNoticeTplCommand extends AbstractCommand
{
    use TemplateVariables;
    use NoticeTrait;

    protected $signature = 'upgrade:noticeAdd {--i|init}';

    protected $description = 'Initialization/new notification type data format.';

    /**
     * @var string
     */
    protected $currentType;

    /**
     * @var ConnectionInterface
     */
    protected $connection;

    /**
     * @var NotificationTplSeeder
     */
    protected $notificationTplSeeder;

    /**
     * @var Collection $tplAll
     */
    protected $tplAll;

    /**
     * AddNoticeTplCommand constructor.
     *
     * @param ConnectionInterface $connection
     * @param string|null $name
     * @param $notificationTplSeeder
     */
    public function __construct(ConnectionInterface $connection, string $name = null, NotificationTplSeeder $notificationTplSeeder)
    {
        parent::__construct($name);

        $this->connection = $connection;
        $this->notificationTplSeeder = $notificationTplSeeder;
    }

    public function handle()
    {
        if ($this->option('init')) {
            $this->initData();
        } else {
            $data = $this->notificationTplSeeder->getFilterTpl();
            $this->tplAll = NotificationTpl::all();

            if (! $this->tplAll->isEmpty()) {
                try {
                    $this->connection->transaction(function () use ($data) {

                        // check iteration data
                        if ($this->checkIterationBeforeData($this->tplAll)) {
                            // change type_name
                            $this->sortOutUnite();
                        }

                        collect($data)->each(function ($item) {
                            /**
                             * ???????????????????????????????????????
                             */
                            if (empty($this->tplAll->where('type_name', $item['type_name'])->where('type', $item['type'])->first())) {
                                // ????????????????????????
                                $this->setCurrentType($item['type']);

                                /** @var NotificationTpl $create */
                                $create = NotificationTpl::query()->create($item);

                                // point out
                                $message = '??????' . $this->currentType . '??????: ' . ' [notice_id] => ' . $create->notice_id . ' [??????] => ' . $create->type_name;
                                $this->comment($message);
                            }
                        });
                    }, 2);
                } catch (Throwable $e) {
                    $this->error($e->getMessage());

                    // ????????????
                    $this->connection->rollback();

                    // ?????????
                    $this->error('');
                    $this->error('??????????????? ????????????????????????????????????????????????????????????????????????????????? notice_id ??????????????? init ????????????????????????');
                    $this->initData();
                }
            } else {
                $this->initData('????????????????????????');
                $this->comment('??????????????????...');
            }
        }

        $this->info('');
        $this->info('???????????? [??????]');
    }

    public function initData($supplement = '')
    {
        // ????????????
        $notice = new NotificationTpl;
        $tableName = config('database.connections.mysql.prefix') . $notice->getTable();

        // ?????????
        if ($this->ask($supplement . '??????????????????????????????????????????(' . $tableName . ')??? ???????????????init') == 'init') {
            NotificationTpl::query()->delete();

            // ????????????ID
            $autoNum = $notice->count();
            $sql = 'alter table ' . $tableName . ' auto_increment = ' . $autoNum;
            $this->connection->statement($sql);

            // php disco db:seed --class NotificationTplSeeder
            $this->notificationTplSeeder->run();
        }
    }

    /**
     * ??????????????????????????????????????? info ???????????????????????????
     *
     * @param $type
     */
    public function setCurrentType($type)
    {
        switch ($type) {
            case NotificationTpl::SYSTEM_NOTICE:
                $this->currentType = '*??????*';
                break;
            case NotificationTpl::WECHAT_NOTICE:
                $this->currentType = '[??????]';
                break;
            case NotificationTpl::SMS_NOTICE:
                $this->currentType = '[??????]';
                break;
            case NotificationTpl::ENTERPRISE_WECHAT_NOTICE:
                $this->currentType = '[????????????]';
                break;
            case NotificationTpl::MINI_PROGRAM_NOTICE:
                $this->currentType = '[?????????]';
                break;
            default:
                $this->currentType = '????????????';
                break;
        }
    }

    public function sortOutUnite()
    {
        $this->tplAll->each(function ($item) {
            // ??????????????????????????????/????????????????????????????????????
            if (isset($this->originConfigTypeName[$item->id])) {
                $originName = $item->type_name;                 // ??? name
                $name = $this->originConfigTypeName[$item->id]; // ?????? name
                if ($originName != $name) {
                    $item->type_name = $name;
                    $item->save();
                    // ??????
                    $msg = "??????'$item->title'(id=$item->id): ???type_name?????????-> [$originName] -> [$name]";
                    $this->comment($msg);
                }
            }
        });
    }

}
