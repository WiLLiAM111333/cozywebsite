import { EventEmitter } from "events";
import { EconomyEvents } from "./EconomyEvents";

export class EconomyEventHandler extends EventEmitter {
  public constructor() {
    super();
  }

  public on<T extends keyof EconomyEvents>(event: T, listener: (...params: EconomyEvents[T]) => void): this {
    return super.on(event, listener);
  }

  public emit<T extends keyof EconomyEvents>(event: T, ...params: EconomyEvents[T]): boolean {
    return super.emit(event, ...params);
  }

  public addListener<T extends keyof EconomyEvents>(event: T, listener: (...params: EconomyEvents[T]) => void): this {
    return super.addListener(event, listener);
  }

  public listenerCount<T extends keyof EconomyEvents>(event: T): number {
    return super.listenerCount(event);
  }

  public listeners<T extends keyof EconomyEvents>(event: T): Array<Function> {
    return super.listeners(event);
  }

  public off<T extends keyof EconomyEvents>(event: T, listener: (...params: EconomyEvents[T]) => void): this {
    return super.off(event, listener);
  }

  public once<T extends keyof EconomyEvents>(event: T, listener: (...params: EconomyEvents[T]) => void): this {
    return super.once(event, listener);
  }

  public prependListener<T extends keyof EconomyEvents>(event: T, listener: (...params: EconomyEvents[T]) => void): this {
    return super.prependListener(event, listener);
  }

  public prependOnceListener<T extends keyof EconomyEvents>(event: T, listener: (...params: EconomyEvents[T]) => void): this {
    return super.prependOnceListener(event, listener);
  }

  public rawListeners<T extends keyof EconomyEvents>(event: T): Array<Function> {
    return super.rawListeners(event);
  }

  public removeAllListeners<T extends keyof EconomyEvents>(event?: T): this {
    return super.removeAllListeners(event);
  }

  public removeListener<T extends keyof EconomyEvents>(event: T, listener: (...params: EconomyEvents[T]) => void): this {
    return super.removeListener(event, listener);
  }
}
