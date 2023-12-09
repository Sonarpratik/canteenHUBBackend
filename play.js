const doctor = {
  _id: "",
  dr_name: "",
  // while creating this will be assign
  user_id: "",
  super_visor_id: "",
  main_super_visor_id: "",
  cemist_ids: [
    {
      _id: "",
      cemist_id: "",
    },
  ],
};

const cemist = {
  _id: "",
  cemist_name: "",
};
const tablet = {
  _id: "",
  tablet_name: "",
};
const user = {
  _id: "",
  user_name: "",
  super_visor_id: "",
  main_super_visor_id: "",
  role: "user",
  // ("user","super_visor","main_super_visor")
};

const daily_report = {
  _id: "",
  date_today: "",

  // while creating this will be assign
  user_id: "",
  super_visor_id: "",
  main_super_visor_id: "",
  data_dr: [
    {
      _id: "",
      dr_id: "",
      tablet: [
        {
          _id: "",
          tablet_id: "",
        },
      ],
      data_cemist: [
        {
          _id: "",
          cemist_id: "",
          tablet: [
            {
              _id: "",
              tablet_id: "",
            },
          ],
        },
      ],
    },
  ],
};
