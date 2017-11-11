import { EntryLog } from '../../models';

export async function create(data) {
  const { userId, ip, loginBy } = data;
  return await new EntryLog({userId, ip, loginBy}).save();
}