import Qty from 'js-quantities';

const roundDown = () => {
  return (scalar, units) => {
    return Math.floor(scalar) + ' ' + units;
  };
};

export default ( amount, { major_unit, minor_unit, round, save }) => {
  let default_unit = '';
  let v = parseFloat(amount);

    switch(major_unit) {
    case 'gal':
      default_unit = 'L';
      break;
    case 'lb':
      default_unit = 'kg';
      break;
    case 'tbsp':
      default_unit = 'L';
      break;
    case 'tsp':
      default_unit = 'L';
      break;
    case 'day':
      default_unit = 'min';
      break;
    case 'oz':
      default_unit = 'kg';
      break;
    case 'ml':
      default_unit = 'L';
      break;
    default:
      default_unit = false;
    };

    if (major_unit === '%') {
      return Math.round(v) + '%';
    }

  if (save) {
    let qty = (new Qty(v, major_unit)).to(default_unit);
    return qty.scalar;
  }

  if (!default_unit) {
    if (round > 0) {
      return Math.round(v * (1/round))/(1/round);
    } else {
      return v;
    }
  }

  if (minor_unit) {
    let qty = (new Qty(v, default_unit)).to(major_unit);
    let qty2 = qty.sub(qty.format(major_unit, roundDown()));
    return(qty.format(major_unit, roundDown()).toString() + ' '
           + qty2.to(minor_unit).toPrec(minor_unit).toString());
  } else {
    let qty = (new Qty(v, default_unit)).to(major_unit);
    let prec = '0.01 ' + major_unit;
    return(qty.toPrec(prec).toString());
  }
}
