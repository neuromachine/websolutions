export const CalculatorDataAdapter = {
  /**
   * Normalizes a loose API service offer into a strictly typed CalculatorPackage
   * @param {Object} offer - The raw offer object from the CMS (e.g. from Group.vue)
   * @returns {Object} A strictly formatted calculator package
   */
  normalizePackage(offer) {
    const props = offer.properties || {};

    let basePrice = 0;
    let isPriceEstimated = true;

    // Handle price normalization
    if (props.price) {
      if (Array.isArray(props.price) && props.price.length > 0) {
        // If price is a range [min, max], take the min and mark as estimated
        const parsed = parseFloat(props.price[0]);
        if (!isNaN(parsed)) {
          basePrice = parsed;
          isPriceEstimated = true;
        }
      } else if (typeof props.price === 'number') {
        basePrice = props.price;
        isPriceEstimated = false;
      } else if (typeof props.price === 'string') {
        // Attempt to parse string to number
        const parsed = parseFloat(props.price.replace(/[^\d.-]/g, ''));
        if (!isNaN(parsed)) {
          basePrice = parsed;
          isPriceEstimated = true; // strings are usually "from 500"
        }
      }
    }

    // Handle features normalization into read-only options
    const options = [];
    if (Array.isArray(props.features)) {
      props.features.forEach((feat, index) => {
        options.push({
          id: `feat-${index}`,
          name: feat,
          included: true,
          priceModifier: 0
        });
      });
    }

    return {
      key: offer.slug,
      title: offer.name,
      description: props.descr || '',
      basePrice,
      isPriceEstimated,
      currency: props.currency || null,
      timeline: props.timeline || null,
      timelineUnit: props.timeline_unit || null,
      options
    };
  }
};
