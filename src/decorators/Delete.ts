/**
 * Copyright ©2021-2022 Dana Basken
 */

import "reflect-metadata";

export const Delete = (path: string): any => {
  return (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }
    const routes = Reflect.getMetadata("routes", target.constructor) as Array<any>;
    routes.push({method: "DELETE", path, handler: propertyKey});
    Reflect.defineMetadata("routes", routes, target.constructor);
  }
};
