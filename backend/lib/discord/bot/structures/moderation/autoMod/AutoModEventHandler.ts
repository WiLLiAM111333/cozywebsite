import { EventEmitter } from "events";
import { AutoModEvents } from "./AutoModEvents";

export class AutoModEventHandler extends EventEmitter {
  public constructor() {
    super();
  }

  public on<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.on(event, listener);
  }

  public emit<T extends keyof AutoModEvents>(event: T, ...params: AutoModEvents[T]): boolean {
    return super.emit(event, ...params);
  }

  public addListener<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.addListener(event, listener);
  }

  public listenerCount<T extends keyof AutoModEvents>(event: T): number {
    return super.listenerCount(event);
  }

  public listeners<T extends keyof AutoModEvents>(event: T): Array<Function> {
    return super.listeners(event);
  }

  public off<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.off(event, listener);
  }

  public once<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.once(event, listener);
  }

  public prependListener<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.prependListener(event, listener);
  }

  public prependOnceListener<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.prependOnceListener(event, listener);
  }

  public rawListeners<T extends keyof AutoModEvents>(event: T): Array<Function> {
    return super.rawListeners(event);
  }

  public removeAllListeners<T extends keyof AutoModEvents>(event?: T): this {
    return super.removeAllListeners(event);
  }

  public removeListener<T extends keyof AutoModEvents>(event: T, listener: (...params: AutoModEvents[T]) => void): this {
    return super.removeListener(event, listener);
  }
}
