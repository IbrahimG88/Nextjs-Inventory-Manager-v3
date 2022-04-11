import { Fragment } from "react";

import { useState } from "react";

export const panelTypes = [];

import { Text } from "@chakra-ui/react";
import Link from "next/link";

export const getStaticProps = async () => {
  const getPreviousDate = await fetch("./api/appVariablesGetDate").then(
    (response) => {
      return response.json().then((data) => {
        console.log("data look", data);

        const myDate = new Date(data[0].date);
        return myDate;
      });
    }
  );
  console.log("getPreviousDate", new Date(getPreviousDate));

  const dateIndividualData = (singleDate) => {
    const dateObject = {
      day: singleDate.getDate() - 1,
      month: singleDate.getMonth() + 1,
      year: singleDate.getFullYear(),
    };
    console.log("today", dateObject.day);
    return dateObject;
  };

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

  const dateSample = dateIndividualData(getPreviousDate);
  const res = await fetch(
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
  for (const key in res) {
    for (const myItem in res[key].panels) {
      panelTypes.push(res[key].panels[myItem].report_name);
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

  fetch("http://localhost:3000/api/optimizedUpdateItemStocks", {
    method: "POST",
    body: JSON.stringify(finalArray),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => console.log("data here", data));

  console.log("revalidate");

  await fetch("./api/appVariablesUpdateDate");

  return {
    props: { finalArray },
    revalidate: 10,
  };
};

export default function FrequencyWorklist({ finalArray }) {
  return (
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
        <a>
          <strong> Inventory </strong>
        </a>
      </Link>
      module.
      <br />
      <br />
      In the Inventory you can seacrh for items and click the column title to
      enable sorting.
    </Text>
  );
}

/*
   <ul>
      {finalArray.map((item) => (
        <li key={item.name}>
          {item.name}:{item.frequency}
        </li>
      ))}
    </ul>
    */
