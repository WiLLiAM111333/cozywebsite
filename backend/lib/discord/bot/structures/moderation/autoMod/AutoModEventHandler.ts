import { EventEmitter } from "events";
import { AutoModEvents } from "./AutoModEvents";

export class AutoModEventHandler extends EventEmitter {
  public constructor() {
    super();
  }

  public override on<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.on(event, listener);
  }

  public override emit<T extends keyof AutoModEvents>(event: T, ...params: AutoModEvents[T]): boolean {
    return super.emit(event, ...params);
  }

  public override addListener<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.addListener(event, listener);
  }

  public override listenerCount<T extends keyof AutoModEvents>(event: T): number {
    return super.listenerCount(event);
  }

  public override listeners<T extends keyof AutoModEvents>(event: T): Array<Function> {
    return super.listeners(event);
  }

  public override off<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.off(event, listener);
  }

  public override once<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.once(event, listener);
  }

  public override prependListener<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.prependListener(event, listener);
  }

  public override prependOnceListener<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.prependOnceListener(event, listener);
  }

  public override rawListeners<T extends keyof AutoModEvents>(event: T): Array<Function> {
    return super.rawListeners(event);
  }

  public override removeAllListeners<T extends keyof AutoModEvents>(event?: T): this {
    return super.removeAllListeners(event);
  }

  public override removeListener<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.removeListener(event, listener);
  }
}
