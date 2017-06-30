import {WebMessage} from '../models'
import * as fixedMessages from '../contants/fixedMessage'

/**
 *
 * @returns {Promise}
 */
export async function initFixedMessages() {
  const options = {upsert: true}
  const fixedMessageList = Object.entries(fixedMessages)

  for(const [name, message] of fixedMessageList) {
    const insertMessage = {...message, isFixed: true}
    await WebMessage.findOneAndUpdate(message, insertMessage, options)
  }
}

export function getFixedMessages() {
  return WebMessage.find({isFixed: true})
}