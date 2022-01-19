/**
 * Copyright ©2022 Dana Basken
 */

import glob from "glob";

export class ControllerManager {

  static start(app: any, prefix: string = "/"): void {
    const expression = "src/**/+([a-zA-Z])Controller.@(ts|js)";
    const pattern = `${process.cwd()}${prefix}${expression}`;
    glob(`${pattern}`, (error: any, files: string[]) => {
      for (const file of files) {
        try {
          import(file).then(async (module: any) => {
            if (module.default) {
              const controller = new module.default();
              await controller.start();
              const prefix = Reflect.getMetadata("prefix", module.default);
              const routes: Array<any> = Reflect.getMetadata("routes", module.default);
              for (const route of routes) {
                app[route.method.toLowerCase()](`${prefix}${route.path}`, (request: any, response: any) => {
                  controller[route.handler](request, response);
                });
              }
            }
          });
        } catch (error: any) {
          console.error(`could not create Controller for ${file}: ${error.message}`);
        }
      }
    });
  }

}
