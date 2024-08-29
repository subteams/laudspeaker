export enum QueueType {
  ENROLLMENT = 'enrollment',
  START = 'start',
  IMPORTS = 'imports',
  TRANSITION = 'transition',
  CUSTOMER_CHANGE = 'customer_change',
  SEGMENT_UPDATE = 'segment_update',
  INTEGRATIONS = 'integrations',
  CUSTOMERS = 'customers',
  SLACK = 'slack',
  MESSAGE = 'message',
  EVENTS = 'events',
  EVENTS_PRE = 'events_pre',
  EVENTS_POST = 'events_post',
  WEBHOOKS = 'webhooks',
  START_STEP = 'start.step',
  WAIT_UNTIL_STEP = 'wait.until.step',
  MESSAGE_STEP = 'message.step',
  JUMP_TO_STEP = 'jump.to.step',
  TIME_DELAY_STEP = 'time.delay.step',
  TIME_WINDOW_STEP = 'time.window.step',
  MULTISPLIT_STEP = 'multisplit.step',
  EXPERIMENT_STEP = 'experiment.step',
  EXIT_STEP = 'exit.step',
}