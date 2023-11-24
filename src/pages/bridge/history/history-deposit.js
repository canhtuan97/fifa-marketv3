import { Table } from "antd";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { getData } from "./../../../apis/utils";
import { HISTORY_API, HISTORY_API_M3 } from "./../../../const/const";
import moment from "moment";
import MetaConnect from "./../../../context/Provider";
import { MODES } from "../convert";

const TablePro = styled(Table)`
  .ant-table-tbody .ant-table-row .ant-table-cell {
    border-top: 8px solid transparent !important;
    border-bottom: 0px solid transparent;
    background-color: #0b1f4f;
    background-clip: padding-box;
  }

  .ant-table-tbody .ant-table-row .ant-table-cell:first-child {
    border-top-left-radius: 18px !important;
    border-bottom-left-radius: 10px !important;
  }
  .ant-table-tbody .ant-table-row .ant-table-cell:last-child {
    border-top-right-radius: 18px !important;
    border-bottom-right-radius: 10px !important;
  }

  .ant-table {
    background-color: transparent;
    color: white;
  }
  .ant-table-tbody .ant-table-row {
    marin-bottom: 10px !important;
    border-radius: 5px !important;
  }

  .ant-table-thead .ant-table-cell {
    background-color: transparent;
    border-bottom: 0px solid transparent;
    color: #86c540;
    font: normal normal bold 14px Poppins;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    width: 0px;
  }
  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    background-color: #091430;
    color: #86c540;
  }
  .ant-pagination-item-active {
    background-color: #091430;
    color: #86c540 !important;
    border-color: #86c540;
  }

  .ant-pagination-item {
    background-color: #091430;
    color: white;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid transparent;
  }
`;

const columns = [
  {
    title: "Hash",
    dataIndex: "tx",
    key: "hash",
    render: (e) => <span>{formatAddress(e)}</span>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (e) => <span>{(e / Math.pow(10, 18)).toFixed(1)}</span>,
  },
  {
    title: "Time",
    dataIndex: "createAt",
    key: "time",
    render: (e) => <span>{moment(e).format("DD-MM-YYYY hh:mm")}</span>,
  },
];

const formatAddress = (_address) => {
  return (
    _address.slice(0, 4) +
    `...` +
    _address.slice(_address.length - 4, _address.length)
  );
};

const App = (props) => {
  const _meta = useContext(MetaConnect);
  const { mode } = props;

  const [dataTable, setDataTable] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [dataTable_m3, setDataTable_m3] = useState([]);
  const [totalRecord_m3, setTotalRecord_m3] = useState(0);
  const [isLoading_m3, setIsLoading_m3] = useState(true);

  const [dataTable_m3_BUSD, setDataTable_m3_BUSD] = useState([]);
  const [totalRecord_m3_BUSD, setTotalRecord_m3_BUSD] = useState(0);
  const [isLoading_m3_BUSD, setIsLoading_m3_BUSD] = useState(true);

  const fetchData = async (url, page, lmt, keyCall) => {
    if (!_meta.address) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const _data = await getData(
      `${url}${_meta.address}?page=${page}&limit=${lmt}`
    );
    setDataTable(_data.items);
    if (keyCall === 1) setTotalRecord(_data?.totalItem || 0);
    setIsLoading(false);
  };

  const fetchData_m3 = async (url, page, lmt, keyCall) => {
    if (!_meta.address) {
      setIsLoading_m3(false);
      return;
    }
    setIsLoading_m3(true);
    const _data = await getData(
      `${url}${_meta.address}?page=${page}&limit=${lmt}`
    );
    setDataTable_m3(_data?.items);
    if (keyCall === 1) setTotalRecord(_data?.totalItem || 0);
    setIsLoading_m3(false);
  };

  const fetchData_m3_BUSD = async (url, page, lmt, keyCall) => {
    if (!_meta.address) {
      setIsLoading_m3_BUSD(false);
      return;
    }
    setIsLoading_m3_BUSD(true);
    const _data = await getData(
      `${url}${_meta.address}?page=${page}&limit=${lmt}`
    );
    setDataTable_m3_BUSD(_data?.items);
    if (keyCall === 1) setTotalRecord(_data?.totalItem || 0);
    setIsLoading_m3_BUSD(false);
  };

  const handleChangePagination = async (e) => {
    await fetchData(HISTORY_API, e - 1, 5, 0);
  };

  const handleChangePagination_m3 = async (e) => {
    await fetchData_m3(HISTORY_API_M3, e - 1, 5, 0);
  };

  const handleChangePagination_m3_BUSD = async (e) => {
    await fetchData_m3_BUSD(HISTORY_API_M3, e - 1, 5, 0);
  };

  useEffect(() => {
    if (mode === MODES[0]) {
      if (props.isLoadPage || _meta.address) {
        fetchData(HISTORY_API, 0, 5, 1);
      } else {
        setDataTable([]);
        setTotalRecord(0);
      }
    }
  }, [props.isLoadPage, _meta.address]);

  useEffect(() => {
    if (mode === MODES[1]) {
      if (props.isLoadPage2 || _meta.address) {
        fetchData_m3(HISTORY_API_M3, 0, 5, 1);
      } else {
        setDataTable_m3([]);
        setTotalRecord_m3(0);
      }
    }
  }, [props.isLoadPage2, _meta.address]);

  useEffect(() => {
    if (mode === MODES[2]) {
      if (props.isLoadPage4 || _meta.address) {
        fetchData_m3_BUSD(HISTORY_API_M3, 0, 5, 1);
      } else {
        setDataTable_m3_BUSD([]);
        setTotalRecord_m3_BUSD(0);
      }
    }
  }, [props.isLoadPage4, _meta.address]);

  useEffect(() => {
    fetchData(HISTORY_API, 0, 5, 1);
    fetchData_m3(HISTORY_API_M3, 0, 5, 1);
    fetchData_m3_BUSD(HISTORY_API_M3, 0, 5, 1);
  }, []);

  return mode === MODES[0] ? (
    <TablePro
      loading={isLoading}
      columns={columns}
      dataSource={dataTable}
      bordered={false}
      pagination={{
        total: totalRecord,
        position: ["bottomCenter"],
        pageSize: 5,
        onChange: (e) => handleChangePagination(e),
      }}
    />
  ) : mode === MODES[1] ? (
    <TablePro
      loading={isLoading_m3}
      columns={columns}
      dataSource={dataTable_m3}
      bordered={false}
      pagination={{
        total: totalRecord_m3,
        position: ["bottomCenter"],
        pageSize: 5,
        onChange: (e) => handleChangePagination_m3(e),
      }}
    />
  ) : (
    <TablePro
      loading={isLoading_m3_BUSD}
      columns={columns}
      dataSource={dataTable_m3_BUSD}
      bordered={false}
      pagination={{
        total: totalRecord_m3_BUSD,
        position: ["bottomCenter"],
        pageSize: 5,
        onChange: (e) => handleChangePagination_m3_BUSD(e),
      }}
    />
  );
};

export default App;
