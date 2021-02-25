type Optional<T extends { [key: string]: any }> = { [key in keyof T]?: any };
