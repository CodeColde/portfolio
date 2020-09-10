import React from "react";
import BackButton from "../../components/BackButton";
import {
  Anchor,
  Body,
  Code,
  ContentContainer,
  Header,
  Paragraph,
} from "../../components/ContentSupport";

const UseFetch = () => {
  const bgRef = React.useRef(null);

  return (
    <>
      <BackButton bgRef={bgRef} />
      <Body>
        <Header
          bgImage="https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?cs=srgb&dl=pexels-negative-space-169573.jpg&fm=jpg"
          imgSource="https://www.pexels.com/@negativespace"
          imgAuth="Negative Space"
          tag="Code"
          title="Create a mini React project using the useFetch hook"
          postDate="November 9, 2019"
          readTime="5"
        >
          So recently I encountered a React coding project that told me not to
          use redux for state management. So I built a fetch and state management hook.
        </Header>
        <ContentContainer ref={bgRef}>
          <Paragraph>
            So recently I encountered a React coding project that told me not to
            use redux for state management. This encouraged me to work on using
            fetch to access data, but I didn’t want to call to the data
            everytime. So I built a useFetch hook.
          </Paragraph>
          <Paragraph>
            So recently I encountered a React coding project that told me not to
            use redux for state management. This encouraged me to work on using
            fetch to access data, but I didn’t want to call to the data
            everytime. So I built a useFetch hook.
          </Paragraph>
          <Paragraph>
            I’m currently unemployed and applying to jobs, and if I don’t get a
            leet coding test, I usually get a challenge or a mini project to do.
            I’ve done several in the past and right now I’ve got two that
            require me to fetch data from a source without using a backend to
            store said data.
          </Paragraph>
          <Paragraph>
            I created a useFetch hook based off of experience I’ve gathered from
            other React projects. The hook is real simple:
          </Paragraph>
          <Code>
{
`function useFetch<T> (url: string, payload?: T): [boolean, any]{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchData () {
    const response = await fetch(url, payload);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffetch(() => {
    fetchData();
  }, [url]);
  return [loading, data];
}`
}
          </Code>
          <Paragraph>
            The above hook is relatively simple. Fetch the data asynchronously
            with a url and a payload (for possible authentication, for example),
            once the data arrives, set loading to false and add data, then
            return both in an easy to access array. Now the user has an
            indicator for if the process is active and if the data has arrived
            or not. It only works for React, however.
          </Paragraph>
          <Paragraph>
            However, I want to store the data somehow, to prevent re-renders. I
            could cache it, but what if I wanted more control on how it gets
            cached, or when the data gets destroyed and needs to call the data
            again?
          </Paragraph>
          <Paragraph>
            This is where the hook seemingly reaches its limit. I can’t store it
            in redux, I can’t cache it… I decided to use two of the browser’s
            storage types instead: Local and Session storage.
          </Paragraph>
          <Paragraph>
            Both storagetypes work similarly to one another. Their only
            difference is until when it gets stored. LocalStorage doesn’t expire
            until the cache is cleared, whereas sessionStorage stores data until
            the page session ends, through the tab or window closing. This is
            how I get more control over the level I want my data to be cached
            in, and a clearer understanding of where it’s stored.
          </Paragraph>
          <Paragraph>
            Making a few adjustments to support this was actually simple. Both
            storage systems work the same, so all I’d really need to do is
            decide which I want to use. I updated the hook and added two
            functions: getStorageType and setStorageType.
          </Paragraph>
          <Code>
{`// setStorageType
function setStorageType(type: string, key: string, data: string) {
  switch (type) {
    case "local":
      localStorage.setItem(key, data);
      break;
    case "session":
      sessionStorage.setItem(key, data);
      break;
    default:
      throw new Error("Storage type is undefined or does not exist");
  }
}
// getStorageType
function getStorageType(type: string, key: string) {
  if (!key) return false;
  switch (type) {
    case "local":
      return localStorage.getItem(key);
    case "session":
      return sessionStorage.getItem(key);
    default:
      return false;
  }
}`}
          </Code>
          <Paragraph>
            The above functions are very simple: provide a key to store data
            under, and define which type you want to store it into. Essentially,
            you could add whatever other storage methods you want to add, such
            as Cookie to name one.
          </Paragraph>
          <Code>
{`// the updated hook
function useFetch<T> (
  url: string,
  payload?: T,
  key?: string,
  type?: "local" | "session"
): [boolean, any] {
  const items = getStorageType(type, key);
  const [data, setData] = useState(items ? JSON.parse(items) : []);
  const [loading, setLoading] = useState(!items);
  async function fetchData () {
    const response = await fetch(url, payload);
    const json = await response.json();
    setData(json);
    setLoading(false);
    if (!!key && !!type) {
      setStorageType(type, key, JSON.stringify(json));
    }
  }
  useEffect(() => {
    if (!items) {
      fetchData();
    }
  }, [items, url, key, type]);
  return [loading, data];
}`}
          </Code>
          <Paragraph>
            The hook didn’t grow too much. All it does it that it assumes that
            there data stored in the storage type first, and retrieves that
            directly for you. There is no need to load this as you’re
            essentially declaring a variable to store that data that already
            exists. There’s no server pushing it to you, there’s just the
            browser that has it. The above hook also supports fetching
            everytime. If you omit the key and type, no data will be stored,
            therefore no data will be retrieved, and the fetch call will be
            called again.
          </Paragraph>
          <Paragraph>
            So why would I use this hook when there’s other things that are
            better out there? Essentially, the only real reason is speed and
            control. More often than not, mini projects or coding challenges
            that require fetching data are small scale, and the JSON rarely
            changes. Therefore it’s easy to have access to a generic hook that
            you can make use of to fetch data, even if I don’t want to store it.
            Since the data doesn’t usually change too often, why not have the
            option to store it locally. It improves performance, even though in
            this scale it doesn’t matter too much, and it prevents unecessary
            renders.
          </Paragraph>
          <Paragraph>
            But say I have the stored data by the time I get to a certain
            component, but I don’t want to use the Fetch hook, and just want
            access to it directly. Or what if I had stored data in one of the
            storages provided. How would I access those? Simple: a retrieve
            function can handle that. I created a small utility function that
            checks if data exists in the declared storage type and retrieves it
            if it does.
          </Paragraph>
          <Code>
{`function retrieve (key: string, type: string): ErrorType | any {
  const store = getStorageType(type, key);
  if (!store) {
    return {
      code: 404,
      message: "Data not found. Either the key contains no data or the data is not stored in the provided type.",
    };
  }
  const parsed = JSON.parse(store);
  return parsed;
}`}
          </Code>
          <Paragraph>Nothing more to it than that.</Paragraph>
          <Paragraph>
            So what’s next? Well, I could create a whole storage handler, or add
            more storages. But all of this currently works fine for what I’m
            expected to do. In the future I plan to create a store utility
            function within this code to store data in a storage type manually,
            to locally store comments for products retrieved and locally stored
            from an api, for example. But for now, this hook is open for use to
            everyone!
          </Paragraph>
          <Paragraph>
            Visit the repository below! Any feedback is welcome, and feel free
            to add feature requests if you feel like this low-level and
            small-scale fetch hook could be more useful to you!
          </Paragraph>
          <Anchor href="https://github.com/CodeColde/use-fetch" rel="noopener noreferrer" target="_blank">
            View The Project Here
          </Anchor>
        </ContentContainer>
      </Body>
    </>
  );
}

export default UseFetch;