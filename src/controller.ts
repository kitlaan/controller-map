import Alpine from 'alpinejs';
import { AlpineComponent } from 'alpinejs';
import { AppComponent, ControllerMap, Layout, Uri } from './app';


type ControllerComponent = AlpineComponent<{
  get layout(): Layout;
  get assets(): ControllerMap;
  get image(): Uri;
  getIcon(name: string): Uri;
  getMapping(location: string): string[];
}>;

function app(): AppComponent {
  return Alpine.store('app') as AppComponent;
}

export default (): ControllerComponent => ({
  get layout(): Layout {
    return app().layout;
  },
  get assets(): ControllerMap {
    return app().controllers[this.layout];
  },
  get image(): Uri {
    const asset = this.assets.image.uri;
    return `./controllers/${this.layout}/${asset}`;
  },
  getIcon(name: string): Uri {
    const ids = name.split('.');
    if (ids.length > 1) {
      const asset = this.assets.features[ids[0]].features[ids[1]].icon;
      return `./controllers/${this.layout}/${asset}`;
    } else {
      const asset =
        app().controllers[this.layout].features[name].icon;
      return `./controllers/${this.layout}/${asset}`;
    }
  },
  getMapping(location: string): string[] {
    // first find the button identifiers that go with this location
    var names = [];
    for (const item in this.assets.features) {
      const feature = this.assets.features[item];
      if (feature.target === location) {
        names.push(item);
      }
      for (const subitem in feature.features) {
        const subfeature = feature.features[subitem];
        if (subfeature.target === location) {
          names.push(`${item}.${subitem}`);
        }
      }
    }

    let subset = [];
    for (const item of this.mappings) {
      if (names.includes(item.id)) {
        subset.push(item);
      }
    }
    return subset;
  },
});
