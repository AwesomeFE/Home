/**
 * 广播消息：mqtt连接广播( 解决mqtt的mongodb高内存占用问题
 */
export const Linked = {
  topic: 'mqtt/broadcast',
  payload: 'Linked',
  qos: 2,
  retain: true
}