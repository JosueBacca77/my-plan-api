import { Role } from '../models/user.model.';
import { REDIS_KEYS } from './constants';

export const getClientCurrentPlanKey = (clientId: string) =>
  `${Role.CLIENT}:${clientId}:${REDIS_KEYS.CURRENT_PLAN}`;
