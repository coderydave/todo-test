import React from "react";
import List from "@material-ui/core/List";
import { ListItem, Typography, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox } from "@material-ui/core";
import SimplePopover from "./PopoverComp/PopoverComp"
import "./ListComp.css";


export default function ListComp({ data, updateData, deleteData, checked, setChecked }) {

  const handleToggle = (id) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List className="list-root">
      {data.map((item) => {
        const labelText = item.tasktext;
        const labelTime = item.datetime;
        const isCheckd = checked.includes(item._id);
        return (
          <ListItem
            key={item._id}
            role={undefined}
            dense
            button
            onClick={handleToggle(item._id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isCheckd}
                disableRipple
                inputProps={{ "aria-labelledby": item._id }}
              />
            </ListItemIcon>
            <ListItemText
              id={item._id}
              primary={labelText}
              style={{ textDecoration: isCheckd ? "line-through" : "" }}
            />
            <ListItemSecondaryAction>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                style={{ textDecoration: isCheckd ? "line-through" : "" }}
              >
                {labelTime.split("T")[1]}
                <SimplePopover updateData={updateData} deleteData={deleteData} item={item} />
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
