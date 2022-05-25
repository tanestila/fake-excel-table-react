export const columns = [
  { Header: "ID", accessor: "id", id: "id", width: 150 },
  { Header: "count", accessor: "count", id: "count", width: 150 },
  {
    Header: "User info",
    columns: [
      {
        Header: "Name",
        accessor: "name",
        id: "name",
        width: 150,
      },
      {
        Header: "status",
        accessor: "status",
        id: "status",
        width: 150,
      },
      {
        Header: "phone",
        accessor: "phone",
        id: "user_phone",
        width: 150,
      },
      {
        Header: "email",
        accessor: "email",
        id: "email",
        width: 150,
      },
      {
        Header: "active",
        accessor: "active",
        id: "active",
        width: 150,
      },
      {
        Header: "password",
        accessor: "password",
        id: "password",
        width: 150,
      },
      {
        Header: "car",
        accessor: "car",
        id: "car",
        width: 150,
      },
    ],
  },
  {
    Header: "Address",
    columns: [
      {
        Header: "Country",
        accessor: "country",
        id: "country",
        width: 150,
      },
      {
        Header: "Zip",
        accessor: "postalZip",
        id: "postalZip",
        width: 150,
      },
      {
        Header: "Region",
        accessor: "region",
        id: "region",
        width: 150,
      },
      {
        Header: "City",
        accessor: "city",
        id: "city",
        width: 150,
      },
      {
        Header: "address",
        accessor: "address",
        id: "address",
        width: 150,
      },
      {
        Header: "Coordinates",
        accessor: "latlng",
        id: "latlng",
        width: 150,
      },
    ],
  },
  {
    Header: "Work",
    columns: [
      {
        Header: "company",
        accessor: "company",
        id: "company",
        width: 150,
      },
      {
        Header: "department",
        accessor: "department",
        id: "department",
        width: 150,
      },
      {
        Header: "position",
        accessor: "position",
        id: "position",
        width: 150,
      },
      {
        Header: "phone",
        accessor: "phone",
        id: "work_phone",
        width: 150,
      },
      {
        Header: "email",
        accessor: "email",
        id: "work_email",
        width: 150,
      },
      {
        Header: "address",
        accessor: "address",
        id: "work_address",
        width: 150,
      },
    ],
  },

  {
    Header: "Order",
    columns: [
      {
        Header: "order guid",
        accessor: "guid",
        id: "guid",
      },
      {
        Header: "order number",
        accessor: "constant",
        id: "constant",
      },

      {
        Header: "currency",
        accessor: "currency",
        id: "currency",
      },
      {
        Header: "count",
        accessor: "numberrange",
        id: "numberrange",
      },
      {
        Header: "comment",
        accessor: "comment",
        id: "comment",
      },
      {
        Header: "date",
        accessor: "date",
        id: "date",
      },
      {
        Header: "time",
        accessor: "time",
        id: "time",
      },
      {
        Header: "enable",
        accessor: "enable",
        id: "enable",
      },
      {
        Header: "fee",
        accessor: "normaldist",
        id: "normaldist",
      },
      {
        Header: "computed",
        accessor: "computed",
        id: "computed",
      },
      {
        Header: "Enable item",
        accessor: "values", /// add colour
        id: "values",
      },
      {
        Header: "Track",
        accessor: "track1",
        id: "track1",
      },
      {
        Header: "paid",
        accessor: "paid",
        id: "paid",
      },
    ],
  },

  {
    Header: "Merchant Info",
    columns: [
      {
        Header: "Name",
        accessor: "merchant",
        id: "merchant",
      },
      {
        Header: "url",
        accessor: "url",
        id: "url",
      },
      {
        Header: "iban",
        accessor: "iban",
        id: "iban",
      },
    ],
  },

  {
    Header: "Payment info",
    columns: [
      {
        Header: "pan",
        accessor: "pan",
        id: "pan",
      },
      {
        Header: "pin",
        accessor: "pin",
        id: "pin",
      },
      {
        Header: "cvv",
        accessor: "cvv",
        id: "cvv",
      },
      {
        Header: "code",
        accessor: "track2",
        id: "track2",
      },
    ],
  },
  {
    Header: "rut",
    accessor: "rut",
    id: "rut",
  },
];
