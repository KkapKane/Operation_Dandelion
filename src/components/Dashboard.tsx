import { RootState } from "../redux/store";
import { List, ListItem} from '@mui/material'
import "../styles/dashboard.scss";
import { useSelector } from "react-redux";

interface Props {
  setFocus: any;
}

export default function Dashboard({ setFocus }: Props) {
  const countries = useSelector((state: RootState) => state.data.value);

  // sort the countries array by data value
  const sortedCountries = [...countries].sort((a, b) => b.Data - a.Data);

  return (
    <div id='Dashboard'>
      <List>
        {sortedCountries.map((country, index) => {
          return (
            <ListItem
              button
              key={index}
              onClick={() => setFocus(sortedCountries, country.name)}
            >
              {country.name}: {country.Data}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
