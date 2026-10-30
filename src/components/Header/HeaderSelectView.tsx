import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MenuItem, Select } from '@mui/material';
import { defaultRoutes } from '../../router/routes';
import { adminViews, localStorage } from '../../services/localStorage';
import { wordings } from '../../wordings';

type AdminView = (typeof adminViews)[number];

export function HeaderSelectView() {
  const navigate = useNavigate();
  const [adminView, setAdminView] = useState<AdminView>(() => localStorage.adminViewHandler.get() || 'admin');

  function onChangeAdminView(adminView: AdminView) {
    localStorage.adminViewHandler.set(adminView);
    setAdminView(adminView);
    navigate(defaultRoutes[adminView]);
  }

  return (
    <Select
      size="small"
      value={adminView}
      onChange={(event) => onChangeAdminView(event.target.value)}
      inputProps={{ 'aria-label': wordings.business.adminViews.label }}
    >
      {adminViews.map((view) => (
        <MenuItem key={view} value={view}>
          {wordings.business.adminViews.values[view]}
        </MenuItem>
      ))}
    </Select>
  );
}
