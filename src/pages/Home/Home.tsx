import { HomeContents } from "../../components/HomeContents";
import { BasePage } from "./BasePage";
import { UserProvider } from "./UserContext";

export const Home = () => {
  return (
    <div>
      <UserProvider>
        <BasePage Contents={<HomeContents />} />
      </UserProvider>
    </div>
  );
};
