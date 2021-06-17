import EventEmitter from "events";
import { ModerationEvents } from "./ModerationEvents";

export class ModerationEventHandler extends EventEmitter {
  public constructor() {
    super();
  }

  public override on<T extends keyof ModerationEvents>(event: T, listener: (...params: ModerationEvents[T]) => void): this {
    return super.on(event, listener);
  }

  public override emit<T extends keyof ModerationEvents>(event: T, ...params: ModerationEvents[T]): boolean {
    return super.emit(event, ...params);
  }

  public override addListener<T extends keyof ModerationEvents>(event: T, listener: (...params: ModerationEvents[T]) => void): this {
    return super.addListener(event, listener);
  }

  public override listenerCount<T extends keyof ModerationEvents>(event: T): number {
    return super.listenerCount(event);
  }

  public override listeners<T extends keyof ModerationEvents>(event: T): Array<Function> {
    return super.listeners(event);
  }

  public override off<T extends keyof ModerationEvents>(event: T, listener: (...params: ModerationEvents[T]) => void): this {
    return super.off(event, listener);
  }

  public override once<T extends keyof ModerationEvents>(event: T, listener: (...params: ModerationEvents[T]) => void): this {
    return super.once(event, listener);
  }

  public override prependListener<T extends keyof ModerationEvents>(event: T, listener: (...params: ModerationEvents[T]) => void): this {
    return super.prependListener(event, listener);
  }

  public override prependOnceListener<T extends keyof ModerationEvents>(event: T, listener: (...params: ModerationEvents[T]) => void): this {
    return super.prependOnceListener(event, listener);
  }

  public override rawListeners<T extends keyof ModerationEvents>(event: T): Array<Function> {
    return super.rawListeners(event);
  }

  public override removeAllListeners<T extends keyof ModerationEvents>(event?: T): this {
    return super.removeAllListeners(event);
  }

  public override removeListener<T extends keyof ModerationEvents>(event: T, listener: (...params: ModerationEvents[T]) => void): this {
    return super.removeListener(event, listener);
  }

  public override eventNames<T extends keyof ModerationEvents>(): Array<T> {
    return super.eventNames() as Array<T>;
  }
}
