import { AlpineComponent } from 'alpinejs';

import xboxone from './controllers/xboxone.json';

export type Layout = "xboxone";

export type Uri = string;

export type ControllerMap = {
  name: string;
  image: {
    uri: Uri,
    dimensions: {
      width: number;
      height: number;
    };
  };
  features: any; // TODO
};

export type AppComponent = AlpineComponent<{
  layout: Layout;
  controllers: { [Property in Layout]: ControllerMap };
}>;

export default (): AppComponent => ({
  layout: 'xboxone',
  controllers: {
    xboxone,
  },
});
