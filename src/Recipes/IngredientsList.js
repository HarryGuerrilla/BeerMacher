import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import sortIngredients from './helpers/sort_ingredients';
import formatUnit from '../helpers/format-units';
import tools from '../helpers/recipe-helpers';

class IngredientList extends Component {
  get ingredients() {
    const ingredients = sortIngredients(this.props);
    console.log(ingredients);
    return ingredients;
  }

  get totalGrainWeight() {
    const totalGrainWeight = tools.totalAmount(this.props.fermentables);
    return totalGrainWeight;
  }

  formatAmount({ category, amount, amount_is_weight }) {
    let formattedAmount = '';
    switch (category) {
      case 'hop':
        formattedAmount = formatUnit(amount, { major_unit: 'oz', round: 0.01 });
        break;
      case 'fermentable':
        if (amount >= 0.453592) {
          formattedAmount = formatUnit(amount, {
            major_unit: 'lb',
            minor_unit: 'oz',
          });
        } else {
          formattedAmount = formatUnit(amount, { major_unit: 'oz' });
        }
        break;
      case 'misc':
        if (amount_is_weight === 'TRUE') {
          formattedAmount = formatUnit(amount, { major_unit: 'oz' });
        } else {
          if (amount >= 0.0147868) {
            formattedAmount = formatUnit(amount, {
              major_unit: 'tbsp',
              round: 0.001,
            });
          } else {
            formattedAmount = formatUnit(amount, { major_unit: 'tsp' });
          }
        }
        break;
      case 'yeast':
        if (amount_is_weight === 'FALSE') {
          formattedAmount = Number.parseFloat(amount / 0.0177442).toFixed(1) +
            ' pkg';
        }
        break;
      default:
        break;
    }
    return formattedAmount;
  }

  formatName(
    { use, name, time, category, color, alpha, laboratory, product_id, amount }
  ) {
    time = time >= 60 * 24
      ? `${Number.parseFloat(time / (60 * 24)).toFixed(1)} Days`
      : `${Number.parseFloat(time)} min`;
    alpha = Number.parseFloat(alpha).toFixed(2);
    color = Number.parseFloat(color).toFixed(1);

    if (category === 'fermentable') {
      return `${name} (${color} SRM)`;
    } else if (category === 'hop') {
      return `${name} [${alpha} %] - ${use} ${time}`;
    } else if (category === 'yeast') {
      return `${name} (${laboratory} #${product_id}) [${formatUnit(amount, {
        major_unit: 'ml',
      })}]`;
    } else {
      return `${name} (${use ? use : ''} ${time})`;
    }
  }

  formatPctIBU({ category, amount, alpha, time, use }, og, batch_size) {
    if (category === 'fermentable') {
      return Math.round(amount / this.totalGrainWeight * 1000) / 10 + '%';
    } else if (category === 'hop') {
      const hops = [
        {
          amount,
          alpha,
          time,
          use,
        },
      ];
      return tools.calculateIBUs({ hops, og, batch_size }).toFixed(1) + ' IBUs';
    } else {
      return '-';
    }
  }

  formatType({ category, type }) {
    if (category === 'hop') {
      return 'Hop';
    } else if (category === 'yeast') {
      return 'Yeast';
    } else {
      return type;
    }
  }

  render() {
    return (
      <Panel header="Ingredients">
        <Table condensed bordered>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Name</th>
              <th>Type</th>
              <th>%/IBU</th>
            </tr>
          </thead>
          <tbody>
            {this.ingredients.map(ingredient => {
              return (
                <tr>
                  <td>{this.formatAmount(ingredient)}</td>
                  <td>{this.formatName(ingredient)}</td>
                  <td>{this.formatType(ingredient)}</td>
                  <td>
                    {this.formatPctIBU(
                      ingredient,
                      this.props.og,
                      this.props.batch_size
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

export default IngredientList;
