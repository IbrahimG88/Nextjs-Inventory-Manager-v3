import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Text, Container, Box } from "@chakra-ui/react";

export const getStaticProps = async () => {
  return fetch("http://197.45.107.206/api2/integration/tests")
    .then((response) => response.json())
    .then((data) => {
      //   console.log("data", data);
      const transformedTestsList = []; // to transform an object into an array
      for (const key in data) {
        transformedTestsList.push({
          id: data[key].profile_id,
          testName: data[key].report_name,
        });
      }

      return {
        props: {
          testsList: transformedTestsList,
        },
        // revalidate: 10000,
      };
    });
};

function LoadInventoryFromLIS(props) {
  const router = useRouter();
  const { testsList } = props;
  const [loading, setLoading] = useState(false);

  async function addInventoryItemHandler() {
    setLoading(true);
    //console.log(testsList);
    // use of Fetch API to make a request to the new-meal api and get back a response
    await fetch(
      "https://nextjs-inventory-manager.vercel.app/api/api-insert-test-mongo-check-first",
      {
        method: "POST",
        body: JSON.stringify(testsList),
        headers: {
          "content-Type": "application/json",
        },
      }
    )
      .then((data) => data.json())
      .then((data) => console.log(data));

    /*.then(
        router.push({
          pathname: "/",
        })
      );*/
    // updates app date
  }

  async function updateDateToNow() {
    await fetch(
      "https://nextjs-inventory-manager.vercel.app/api/appVariablesUpdateDate"
    );
  }

  if (!testsList) {
    return <p> failed to load data</p>;
  }

  return (
    <Container maxW="2xl" margin={"50px"}>
      <Text>
        Admin section to manage app variables. Do not use unless advised.
      </Text>
      <Box>
        <Button
          onClick={addInventoryItemHandler}
          colorScheme="teal"
          variant="outline"
          margin={"10px"}
        >
          Update testsList
        </Button>
        <Button
          onClick={updateDateToNow}
          colorScheme="teal"
          variant="outline"
          margin={"10px"}
        >
          Set Date to now
        </Button>
        <Text fontSize="md" margin={"10px"}>
          Number of tests in inventory: {testsList.length}
        </Text>
        {loading ? (
          <Text fontSize="md" margin={"10px"}>
            Tests List is being updated
          </Text>
        ) : (
          <Text fontSize="md" margin={"10px"}>
            Click to load or update tests list, also initializes the app
            inventory and app dates variable
          </Text>
        )}
      </Box>
    </Container>
  );
}

export default LoadInventoryFromLIS;

//form and submit to run addinventoryitemhandler with argument of the item to add
// getstatic props to get the test items from lis
