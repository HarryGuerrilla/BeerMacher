const tinseth = (og, min) => {
  let gravityFactor = 1.65 * Math.pow(0.000125, og - 1);
  let timeFactor = (1 - Math.pow(Math.E, -0.04 * min)) / 4.15;
  return gravityFactor * timeFactor;
};

const toLb = kilo => {
  return kilo * 2.204172052;
};

const toGal = liters => {
  return liters * 0.264172052;
};

const helpers = {
  litersToGal: toGal,
  kilosToLb: toLb,
  calculateIBUs: ({ hops, og, batch_size }) => {
    return hops.reduce(
      (total, hop) => {
        let w = parseFloat(hop.amount) * 1000;
        let aa = parseFloat(hop.alpha) / 100;
        let u = tinseth(parseFloat(og), parseFloat(hop.time));
        let vol = parseFloat(batch_size);
        return hop.use === 'Boil' ? total + w * aa * u * 1000 / vol : total;
      },
      0
    );
  },
  totalAmount: ingredient => {
    return ingredient.reduce(
      (total, cur) => {
        return total + parseFloat(cur.amount);
      },
      0
    );
  },
  calcOriginalGravity: ({ efficiency, batch_size, fermentables }) => {
    let ee = efficiency / 100;
    let volume = toGal(batch_size);
    let sgp = fermentables.reduce(
      (total, cur) => {
        return total +
          toLb(parseFloat(cur.amount)) *
            (46 * (parseFloat(cur.yield) / 100)) *
            ee /
            volume;
      },
      0
    );
    return 1 + sgp / 1000;
  },
  calcPreBoilGravity: ({ og, batch_size, equipment, boil_size }) => {
    let ppg = og * 1000 - 1000;
    let gp = ppg *
      (toGal(parseFloat(batch_size)) +
        toGal(parseFloat(equipment.trub_chiller_loss)));
    let bs = parseFloat(boil_size);
    let preBoil = 1 + gp / bs / 1000;
    return preBoil;
  },
  finalGravity: ({ yeasts, og }) => {
    let amount = yeasts.reduce(
      (total, cur) => {
        return total + parseFloat(cur.amount);
      },
      0
    );
    let yeastAtt = yeasts.reduce(
      (total, cur) => {
        return total +
          parseFloat(cur.amount) * (parseFloat(cur.attenuation) / 100);
      },
      0
    );

    let totalAttenuation = yeastAtt / amount;
    return (og - 1) * (1 - totalAttenuation) + 1;
  },
  bitternessRatio: ({ og, ibus }) => {
    let gp = og * 1000 - 1000;
    return ibus / gp;
  },
  abv: ({ og, fg }) => {
    return 76.08 * (og - fg) / (1.775 - og) * (fg / 0.794);
  },
  srm: ({ fermentables, batch_size, equipment }) => {
    let mcu = fermentables.reduce(
      (total, cur) => {
        if (cur.type === 'Grain') {
          return total +
            toLb(parseFloat(cur.amount)) *
              parseFloat(cur.color) /
              toGal(
                parseFloat(batch_size) + parseFloat(equipment.trub_chiller_loss)
              );
        } else {
          return 0;
        }
      },
      0
    );
    return 1.4922 * Math.pow(mcu, 0.6859);
  },
  boilVolume: ({ batch_size, equipment, boil_time }) => {
    let bs = parseFloat(batch_size);
    let top_up = parseFloat(equipment.top_up_water);
    let trub = parseFloat(equipment.trub_chiller_loss);
    let evap = parseFloat(equipment.evap_rate) / 100;
    let time = parseFloat(boil_time) / 60;
    return (bs - top_up + trub) * (1 + time * evap);
  },
};

export default helpers;
