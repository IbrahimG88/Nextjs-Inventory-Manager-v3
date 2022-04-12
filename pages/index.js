import { Text } from "@chakra-ui/react";
import Link from "next/link";

export const panelTypes = [];

export async function getPreviousDate() {
  await fetch(`${process.env.APP_URL}/api/appVariablesGetDate`).then(
    (response) => {
      return response.json().then((data) => {
        console.log("data look", data);

        const myDate = new Date(data[0].date);
        return myDate;
      });
    }
  );
}

export async function consumptionDataFunction(dateSample) {
  const nowDate = () => {
    const now = new Date();
    const dateObject = {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };
    //console.log("today", dateObject.day);
    return dateObject;
  };
  await fetch(
    `http://197.45.107.206/api2/integration/worklist/${dateSample.year}-${
      dateSample.month
    }-${dateSample.day}%2000:00:00:00/${nowDate().year}-${nowDate().month}-${
      nowDate().day
    }%2000:00:00:00`
  ).then((response) => {
    return response.json().then((data) => {
      return data;
    });
  });
}

export async function sendStockConsumptionData() {
  await fetch(`${process.env.APP_URL}/api/optimizedUpdateItemStocks`, {
    method: "POST",
    body: JSON.stringify(finalArray),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => console.log("data here", data));
}

export async function updateAppVariableDate() {
  await fetch(`${process.env.APP_URL}/api/appVariablesUpdateDate`);
}

export const getStaticProps = async () => {
  const previousDate = await getPreviousDate();

  const dateIndividualData = async (singleDate) => {
    const dateObject = await {
      day: singleDate.getDate() - 1,
      month: singleDate.getMonth() + 1,
      year: singleDate.getFullYear(),
    };
    console.log("today", dateObject.day);
    return dateObject;
  };

  const dateSample = dateIndividualData(previousDate);

  const consumptionData = await consumptionDataFunction(dateSample);

  for (const key in consumptionData) {
    for (const myItem in consumptionData[key].panels) {
      panelTypes.push(consumptionData[key].panels[myItem].report_name);
    }
  }

  const custFreq = panelTypes.reduce((acc, curr) => {
    acc[curr] = (acc[curr] ?? 0) + 1;

    return acc;
  }, {});

  const finalArray = [];

  for (const key in custFreq) {
    finalArray.push({
      name: key,
      frequency: custFreq[key],
    });
  }
  console.log("finalArray look", finalArray);

  sendStockConsumptionData();

  updateAppVariableDate();

  return {
    props: { finalArray },
  };
};

function FrequencyWorklist({ finalArray }) {
  return (
    <>
      <Text style={{ marginLeft: "50px" }}>
        <br />
        <br />
        Welcome to the <strong>Inventory Manager app</strong> that automates
        inventory consumption data. You can search all test items and add the
        corresponding stocks in the
        <Link href="/accordion-updated" passHref>
          <strong> add stocks </strong>
        </Link>
        section. You can view all tests inventory and amounts remaining for each
        item in the
        <Link href="/react-table" passHref>
          <strong> Inventory </strong>
        </Link>
        module.
        <br />
        <br />
        In the Inventory you can seacrh for items and click the column title to
        enable sorting.
      </Text>

      <ul>
        {finalArray.map((item) => (
          <li key={item.name}>
            {item.name}:{item.frequency}
          </li>
        ))}
      </ul>
    </>
  );
}

export default FrequencyWorklist;
/*
   <ul>
      {finalArray.map((item) => (
        <li key={item.name}>
          {item.name}:{item.frequency}
        </li>
      ))}
    </ul>
*/
