import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ItemsList() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  let amountsInput;
  const router = useRouter();

  function handleClick(test, index) {
    //console.log("clickname", test);
    //console.log("clickindex", index);

    router.push({
      pathname: `/itemData/${index}`,
    });
  }

  const handleChange = (e, id) => {
    console.log("vip index change", id);

    const myIndexOfItem = sales.findIndex((x) => x.id === id);
    // we need to find index of our item from the filter in the sales array,
    // we need something like index of

    console.log("sales", sales);

    const { value, name } = e.target;
    //  console.log("name", name);
    // console.log("value", value);
    const newSales = [...sales];

    newSales[myIndexOfItem] = {
      ...newSales[myIndexOfItem],
      [name]: value,
      totalStocks: Number(newSales[myIndexOfItem].totalStocks),
      updatedStocks:
        Number(value) + Number(newSales[myIndexOfItem].totalStocks),
      stocksToAdd: Number(value),
    };
    console.log("newSalesmyIndexOfItem", newSales[myIndexOfItem]);
    sales = newSales;
    // console.log("sales", sales);
    setSales(sales);
  };

  const handleKeyDown = (event, id) => {
    const myIndexOfItem = sales.findIndex((x) => x.id === id);

    if (event.key === "Enter") {
      updateItemHandler(myIndexOfItem);
      const newSales = [...sales];

      newSales[myIndexOfItem] = {
        ...newSales[myIndexOfItem],

        totalStocks: Number(newSales[myIndexOfItem].updatedStocks),
      };
      sales = newSales;
      //   console.log("sales", sales);
      setSales(sales);
      event.target.value = " ";
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.APP_URL}/api/getAllTestsHandler`)
      .then((response) => response.json())
      .then((data) => {
        //data from firebase will be returned as an object and nested ones
        const transformedSales = []; // to transform an object into an array
        for (const key in data) {
          transformedSales.push({
            _id: data[key]._id,
            id: data[key].id,
            testName: data[key].testName,
            totalStocks: data[key].TotalStocks,
            date: data[key].date,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
        //  console.log("sss", transformedSales);
      });
  }, []);

  async function updateItemHandler(itemIndex) {
    //  console.log("itemIndex hereeee", updatedIndex);

    //  console.log("sales[itemIndex ......]", sales[updatedIndex]);
    const updateObject = {
      id: sales[itemIndex].id,
      stocksAdded: sales[itemIndex].stocksAdded,
    };
    console.log("updateObject", updateObject);
    //console.log("sales[itemIndex]", sales[updatedIndex]);
    //console.log("update object", updateObject);
    await fetch(`${process.env.APP_URL}/api/updateItem`, {
      method: "POST",
      body: JSON.stringify(updateObject),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  }

  if (isLoading) {
    return <p>Loading... </p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }

  return (
    <center>
      <Accordion allowToggle>
        <p>Type to filter the tests list:</p>
        <br />
        <Input
          id="filter"
          name="filter"
          type="text"
          value={filter}
          placeholder="search for test..."
          onChange={(event) => setFilter(event.target.value.toLowerCase())}
        />
        {filter ? (
          sales
            .filter((f) => f.testName.toLowerCase().indexOf(filter) > -1)
            .map((item, index) => (
              <AccordionItem key={item._id}>
                <h2>
                  <AccordionButton _expanded={{ bg: "blue", color: "white" }}>
                    <Box flex="1" textAlign="left">
                      {item.testName}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text> Add Stocks:</Text>
                  <Input
                    placeholder="stocks to add..."
                    type="number"
                    name="stocksAdded"
                    id="stocksAdded"
                    value={amountsInput}
                    onChange={(e) =>
                      setTimeOut(handleChange(e, item.id, item.testName), 1500)
                    }
                    onKeyDown={(e) =>
                      setTimeOut(handleKeyDown(e, item.id), 1500)
                    }
                  />
                  {item.totalStocks ? (
                    <Text>Previous Total Stocks: {item.totalStocks}</Text>
                  ) : null}
                  {item.updatedStocks ? (
                    <Text>
                      Updated Total Stocks:
                      {item.updatedStocks}
                    </Text>
                  ) : null}
                </AccordionPanel>
              </AccordionItem>
            ))
        ) : (
          <div>
            <br />
            <p>
              Type the test name you want to search for to add stocks for...
            </p>
          </div>
        )}
      </Accordion>
    </center>
  );
}
