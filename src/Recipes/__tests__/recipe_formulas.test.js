import React from 'react';
import { Recipe } from '../index';
import * as data from '../../assets/paleAle.json';

const props = {
  recipe: data.recipes[0],
  params: {
    id: "1",
  }
}

const r = new Recipe(props);

describe('Recipe characteristics', () => {
  it('should have name', () => {
    expect(r.name).toEqual('American Pale Ale - BYO');
  });

  it('should have abv', () => {
    expect(r.abv).toEqual('6%');
  });

  it('should have bitterness ratio', () => {
    expect (r.bitternessRatio).toEqual('0.52');
  });

  it('should have original gravity', () => {
    expect (r.og).toEqual('1.058');
  });

  it('should have final gravity', () => {
    expect (r.fg).toEqual('1.014');
  });

  it('should have ibus', () => {
    expect (r.ibus).toEqual('30');
  });

  it('should have srm', () => {
    expect (r.srm).toEqual('6.1');
  });

  it('should have efficiency', () => {
    expect (r.efficiency).toEqual('65%');
  });

  it('should have batch size', () => {
    expect (r.batchSize).toEqual('5 gal');
  });

  it('should have boil size', () => {
    expect (r.boilSize).toEqual('6.23 gal');
  });

  it('should have pre-boil gravity', () => {
    expect (r.pbOG).toEqual('1.054');
  });

  it('should have boil time', () => {
    expect(r.boilTime).toEqual('60 min');
  });

  it('should have total grains', () => {
    expect(r.totalGrains).toEqual('12.25 lbs');
  });

  it('should have total hops', () => {
    expect(r.totalHops).toEqual('3.55 oz');
  });
})
