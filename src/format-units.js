import Qty from 'js-quantities';

const roundDown = () => {
  return (scalar, units) => {
    return Math.floor(scalar) + ' ' + units;
  };
};

export default ({ amount, major_unit, minor_unit }) => {
  if (minor_unit) {
    let qty = (new Qty(amount)).to(major_unit);
    let qty2 = qty.sub(qty.format(major_unit, roundDown()));
    return(qty.format(major_unit, roundDown()).toString() + ' '
           + qty2.to(minor_unit).toPrec(minor_unit).toString());
  } else {
    let qty = (new Qty(amount)).to(major_unit);
    let prec = '0.01 ' + major_unit;
    return(qty.toPrec(prec).toString());
  }
}
