/**
 * Copyright ©2021-2022 Dana Basken
 */

import "reflect-metadata";

export const Controller = (prefix: string = ""): any => {
  return (target: any) => {
    Reflect.defineMetadata("prefix", prefix, target);
    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
  };
};
