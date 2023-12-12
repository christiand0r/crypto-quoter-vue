import { reactive, ref, watch } from "vue";

const url = import.meta.env.VITE_BASE_URL;

const useCurrency = () => {
  const status = ref(null);
  const marketcap = ref(null);
  const currencyData = reactive({
    fiat: "",
    crypto: "",
  });

  // Just watch the property "fiat"
  watch(
    () => currencyData.fiat,
    (value) => {
      if (!value) return;

      status.value = "Obtiniendo capitalización del mercado...";

      fetch(`${url}/data/top/mktcapfull?limit=10&tsym=${value}`)
        .then((res) => res.json())
        .then((json) =>
          json.Data.map((data) => {
            const { CoinInfo: info } = data;

            return {
              id: info.Id,
              fullname: info.FullName,
              image: info.ImageUrl,
              name: info.Name,
            };
          })
        )
        .then((data) => {
          marketcap.value = data;
          status.value = "Datos capitalización obtenidos";
        })
        .catch((err) => {
          console.error(err);
          status.value = "Ocurrido un problema para obtener la capitalización";
        })
        .finally(() => window.setTimeout(() => (status.value = null), 800));
    }
  );

  return { currencyData, marketcap, status };
};

export default useCurrency;
