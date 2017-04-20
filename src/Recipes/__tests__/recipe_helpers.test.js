import React from 'react';
import { shallow } from 'enzyme';
import IngredientList from '../IngredientsList';
import * as data from '../../assets/paleAle.json';

const r = data.recipes[0];

const ingredientList = shallow(
  <IngredientList
    hops={r.hops}
    fermentables={r.fermentables}
    yeasts={r.yeasts}
    miscs={r.miscs}
    waters={r.waters}
    og={r.og}
    batch_size={r.batch_size}
  />
);

function getAmount(ingredients, index) {
  return ingredients.slice(index).children().at(0).text();
}

function getName(ingredients, index) {
  return ingredients.slice(index).children().at(1).text();
}

function getType(ingredients, index) {
  return ingredients.slice(index).children().at(2).text();
}

function getPctIbu(ingredients, index) {
  return ingredients.slice(index).children().at(3).text();
}

const ingredients = ingredientList.find('tr');
describe('Recipe', () => {
  it('should have ingredients', () => {
    expect(ingredientList.find('h2').text()).toEqual('Ingredients');
  });

  it('should order ingredients by when they are used', () => {
    // 1
    expect(getAmount(ingredients, 1)).toEqual('1 tb');
    expect(getName(ingredients, 1)).toEqual('PH 5.2 Stabilizer (Mash 60 min)');
    expect(getType(ingredients, 1)).toEqual('Water Agent');
    expect(getPctIbu(ingredients, 1)).toEqual('-');

    // 2
    expect(getAmount(ingredients, 2)).toEqual('10 lbs 8 oz');
    expect(getName(ingredients, 2)).toEqual('Pale Malt (2 Row) US (2.0 SRM)');
    expect(getType(ingredients, 2)).toEqual('Grain');
    expect(getPctIbu(ingredients, 2)).toEqual('85.7%');

    // 3
    expect(getAmount(ingredients, 3)).toEqual('10 oz');
    expect(getName(ingredients, 3)).toEqual('Munich Malt (8.0 SRM)');
    expect(getType(ingredients, 3)).toEqual('Grain');
    expect(getPctIbu(ingredients, 3)).toEqual('5.1%');

    // 4
    expect(getAmount(ingredients, 4)).toEqual('10 oz');
    expect(getName(ingredients, 4)).toEqual('Victory Malt (28.0 SRM)');
    expect(getType(ingredients, 4)).toEqual('Grain');
    expect(getPctIbu(ingredients, 4)).toEqual('5.1%');

    // 5
    expect(getAmount(ingredients, 5)).toEqual('8 oz');
    expect(getName(ingredients, 5)).toEqual('Wheat Malt,Ger (2.0 SRM)');
    expect(getType(ingredients, 5)).toEqual('Grain');
    expect(getPctIbu(ingredients, 5)).toEqual('4.1%');

    // 6
    expect(getAmount(ingredients, 6)).toEqual('0.65 oz');
    expect(getName(ingredients, 6)).toEqual('Horizon [10.10 %] - Boil 60 min');
    expect(getType(ingredients, 6)).toEqual('Hop');
    expect(getPctIbu(ingredients, 6)).toEqual('22.3 IBUs');

    // 7
    expect(getAmount(ingredients, 7)).toEqual('0.25 tsp');
    expect(getName(ingredients, 7)).toEqual('Irish Moss (Boil 10 min)');
    expect(getType(ingredients, 7)).toEqual('Fining');
    expect(getPctIbu(ingredients, 7)).toEqual('-');

    // 8
    expect(getAmount(ingredients, 8)).toEqual('0.5 oz');
    expect(getName(ingredients, 8)).toEqual('Cascade [5.90 %] - Boil 10 min');
    expect(getType(ingredients, 8)).toEqual('Hop');
    expect(getPctIbu(ingredients, 8)).toEqual('3.6 IBUs');

    // 9
    expect(getAmount(ingredients, 9)).toEqual('0.4 oz');
    expect(getName(ingredients, 9)).toEqual(
      'Centennial [11.40 %] - Boil 10 min'
    );
    expect(getType(ingredients, 9)).toEqual('Hop');
    expect(getPctIbu(ingredients, 9)).toEqual('5.6 IBUs');

    // 10
    expect(getAmount(ingredients, 10)).toEqual('0.5 oz');
    expect(getName(ingredients, 10)).toEqual('Cascade [6.00 %] - Boil 0 min');
    expect(getType(ingredients, 10)).toEqual('Hop');
    expect(getPctIbu(ingredients, 10)).toEqual('0.0 IBUs');

    // 11
    expect(getAmount(ingredients, 11)).toEqual('0.5 oz');
    expect(getName(ingredients, 11)).toEqual(
      'Centennial [9.00 %] - Boil 0 min'
    );
    expect(getType(ingredients, 11)).toEqual('Hop');
    expect(getPctIbu(ingredients, 11)).toEqual('0.0 IBUs');

    // 12
    expect(getAmount(ingredients, 12)).toEqual('2.0 pkg');
    expect(getName(ingredients, 12)).toEqual(
      'California Ale (White Labs #WLP001) [35.49 ml]'
    );
    expect(getType(ingredients, 12)).toEqual('Yeast');
    expect(getPctIbu(ingredients, 12)).toEqual('-');

    // 13
    expect(getAmount(ingredients, 13)).toEqual('0.5 oz');
    expect(getName(ingredients, 13)).toEqual(
      'Cascade [5.90 %] - Dry Hop 3.0 Days'
    );
    expect(getType(ingredients, 13)).toEqual('Hop');
    expect(getPctIbu(ingredients, 13)).toEqual('0.0 IBUs');

    // 14
    expect(getAmount(ingredients, 14)).toEqual('0.5 oz');
    expect(getName(ingredients, 14)).toEqual(
      'Centennial [11.40 %] - Dry Hop 3.0 Days'
    );
    expect(getType(ingredients, 14)).toEqual('Hop');
    expect(getPctIbu(ingredients, 14)).toEqual('0.0 IBUs');
  });

  it('should allow you to reorder ingredients', () => {});
});
