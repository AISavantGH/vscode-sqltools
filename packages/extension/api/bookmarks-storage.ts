import { NotFoundException } from '@sqltools/core/exception';
import path from 'path';
import BaseStorage from './base-storage';
import { getHome } from '@sqltools/core/utils/get-home';

export default class BookmarksStorage extends BaseStorage {
  constructor(public name: string = '.Bookmarks') {
    super(path.join(getHome(), `${name}.SQLToolsStorage.json`), {});
  }

  public add(name: string, query: string): BookmarksStorage {
    this.items[name] = query;
    return this.save();
  }

  public get(key): Object {
    if (!this.items[key]) {
      throw new NotFoundException('Query not found!');
    }
    return this.items[key];
  }

  public delete(key): this {
    this.get(key);
    delete this.items[key];
    return this.save();
  }

  public getSize = (): number => Object.keys(this.items).length;

  public all = (): Object => this.items;
}
