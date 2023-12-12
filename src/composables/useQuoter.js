import { ref } from "vue";
import { generateID } from "../helpers/index.js";

const url = import.meta.env.VITE_BASE_URL;

const useQuoter = () => {
  const quoter = ref(null);
  const loadingQuoter = ref(null);

  const getQuoterData = ({ crypto, fiat }) => {
    quoter.value = null;
    loadingQuoter.value = true;

    fetch(`${url}/data/pricemultifull?fsyms=${crypto}&tsyms=${fiat}`)
      .then((res) => res.json())
      .then((json) => {
        const { DISPLAY: display, RAW: raw } = json;

        quoter.value = {
          id: generateID(),
          highday: display[crypto][fiat].HIGHDAY,
          image: display[crypto][fiat].IMAGEURL,
          lowday: display[crypto][fiat].LOWDAY,
          name: raw[crypto][fiat].FROMSYMBOL,
          pair: fiat,
          price: display[crypto][fiat].PRICE,
          ptc24: display[crypto][fiat].CHANGEPCT24HOUR,
          updated: display[crypto][fiat].LASTUPDATE,
          timestamp: Date.now()
        };
      })
      .finally(() => (loadingQuoter.value = false));
  };

  return {
    quoter,
    loadingQuoter,
    getQuoterData,
  };
};

export default useQuoter;
