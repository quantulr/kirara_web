import PageScaffold from "@/components/PageScaffold.tsx";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Search = () => {
  return (
    <PageScaffold title={"搜索"}>
      <div className={"w-full p-3"}>
        <InputGroup>
          <Input
            type={"search"}
            placeholder={"请输入搜索关键词"}
            className={"w-full"}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </div>
    </PageScaffold>
  );
};

export default Search;
