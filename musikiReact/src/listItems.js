import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import AlbumIcon from '@material-ui/icons/Album';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import StarsIcon from '@material-ui/icons/Stars';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Iniciar" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExploreIcon />
      </ListItemIcon>
      <ListItemText primary="Explore" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarsIcon />
      </ListItemIcon>
      <ListItemText primary="Artistas" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AlbumIcon />
      </ListItemIcon>
      <ListItemText primary="Álbuns" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MusicNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Músicas" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
