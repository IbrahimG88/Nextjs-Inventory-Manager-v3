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
    await fetch("/api/api-insert-test-mongo-check-first", {
      method: "POST",
      body: JSON.stringify(testsList),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => console.log(data));

    /*.then(
        router.push({
          pathname: "/",
        })
      );*/
    // updates app date
    await fetch("http://localhost:3000/api/appVariablesUpdateDate");
  }

  if (!testsList) {
    return <p> failed to load data</p>;
  }

  return (
    <Container maxW="2xl" margin={"50px"}>
      <Box>
        <Button
          onClick={addInventoryItemHandler}
          colorScheme="teal"
          variant="outline"
          margin={"10px"}
        >
          Update testsList
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
