import {useVuex} from "../store";
import {useVueRouter} from "../router";

export function registerPlugins(app) {
  useVuex(app);
  useVueRouter(app);
}