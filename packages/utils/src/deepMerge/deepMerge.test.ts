import { describe, it, expect } from 'vitest';
import { deepMerge } from '~/deepMerge';
import { createProfile } from '~/_testUtils';
import { Obj } from '~/types';

describe('deepmerge', () => {
  it('should not be subject to prototype pollution', () => {
    deepMerge({}, JSON.parse('{ "myProperty": "a", "__proto__" : { "isAdmin" : true } }'), {
      clone: false
    });
    // removing "if (key === "__proto__") continue;" from the "for in" loop
    // would cause this to fail
    expect({}).not.toHaveProperty('isAdmin');
  });

  it('should merge nested objects, clone, and overwrite arrays by default', () => {
    const original = createProfile();

    const update = {
      is_robot: undefined,
      permissions: {
        is_owner: true,
        is_admin: true
      },
      team: {
        owners: []
      }
    };

    const merged = deepMerge(original, update);

    // @ts-ignore
    expect(merged !== original).toBeTruthy();
    // @ts-ignore
    expect(merged.team !== original.team).toBeTruthy();
    // @ts-ignore
    expect(merged.team !== original.team).toBeTruthy();

    expect(merged).toMatchObject({
      id: 2,
      name: { fist: 'Dolores', last: 'Abernathy' },
      is_robot: undefined,
      permissions: {
        is_owner: true,
        is_admin: true
      },
      favorite_movies: ['ex machina'],
      team: {
        owners: [],
        members: [{ id: 4, name: { first: 'Teddy', last: 'Flood' } }]
      }
    });
  });

  it("should concat arrays when 'concat' option is passed to arrayMerge", () => {
    const original = createProfile();

    const update = {
      favorite_movies: ['matrix']
    };

    const merged = deepMerge(original, update, { arrayMerge: 'concat' });

    expect(merged).toMatchObject({
      id: 2,
      name: { fist: 'Dolores', last: 'Abernathy' },
      is_robot: true,
      permissions: {
        is_owner: false
      },
      favorite_movies: ['ex machina', 'matrix'],
      team: {
        owners: [
          { id: 1, name: { first: 'Robert', last: 'Ford' } },
          { id: 3, name: { first: 'Bernard', last: 'Lowe' } }
        ],
        members: [{ id: 4, name: { first: 'Teddy', last: 'Flood' } }]
      }
    });
  });

  it("should deep merge each index of arrays when 'byIndex' option is passed to arrayMerge", () => {
    const original = createProfile();

    const update = {
      favorite_movies: ['matrix'],
      team: {
        owners: [{ name: { first: 'Rob' } }, { is_homie: true }],
        members: [{ is_homie: true }]
      }
    };

    const merged = deepMerge(original, update, { arrayMerge: 'byIndex' });

    expect(merged).toMatchObject({
      id: 2,
      name: { fist: 'Dolores', last: 'Abernathy' },
      is_robot: true,
      permissions: {
        is_owner: false
      },
      favorite_movies: ['matrix'],
      team: {
        owners: [
          { id: 1, name: { first: 'Rob', last: 'Ford' } },
          { id: 3, name: { first: 'Bernard', last: 'Lowe' }, is_homie: true }
        ],
        members: [{ id: 4, name: { first: 'Teddy', last: 'Flood' }, is_homie: true }]
      }
    });
  });

  it('should merge with custom array merge function when option is passed to arrayMerge', () => {
    const original = createProfile();

    const update = {
      team: {
        owners: [{ id: 3, is_homie: true }],
        members: [{ id: 4, is_homie: true }]
      }
    };

    const testCustomArrayMerge_updateById = (target: Obj, source: Obj) =>
      target.map((existing: Record<string, any>) => {
        const update = source.find((it: Record<string, any>) => it.id === existing.id);
        if (update) return deepMerge(existing, update);
        return existing;
      });

    const merged = deepMerge(original, update, {
      arrayMerge: testCustomArrayMerge_updateById
    });

    expect(merged).toMatchObject({
      id: 2,
      name: { fist: 'Dolores', last: 'Abernathy' },
      is_robot: true,
      permissions: {
        is_owner: false
      },
      favorite_movies: ['ex machina'],
      team: {
        owners: [
          { id: 1, name: { first: 'Robert', last: 'Ford' } },
          { id: 3, name: { first: 'Bernard', last: 'Lowe' }, is_homie: true }
        ],
        members: [{ id: 4, name: { first: 'Teddy', last: 'Flood' }, is_homie: true }]
      }
    });
  });
});
