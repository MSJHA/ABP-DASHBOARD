import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useParams } from 'react-router-dom';
import axios from '../plugin/axios';

const Rechart = () => {
  const [data, setData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [userDetails, setUserDetails] = useState({});
  const { user_login_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/graph-api/${user_login_id}`);
        const jsonData = response.data;

        const loginCounts = {};
        jsonData.userSessionHistory.forEach(entry => {
          const date = new Date(entry.last_login_date).toLocaleDateString();
          const device = entry.device_type;
          const channel = entry.channel_name; 
          const key = `${date}_${device}_${channel}`;
          loginCounts[key] = (loginCounts[key] || 0) + 1;
        });

        const formattedData = Object.keys(loginCounts).reduce((acc, key) => {
          const [date, device, channel] = key.split('_');
          const count = loginCounts[key];
          if (!acc[date]) {
            acc[date] = { date, total: 0, channels: {} };
          }
          if (!acc[date].channels[channel]) {
            acc[date].channels[channel] = { [device]: count };
          } else {
            acc[date].channels[channel][device] = count;
          }
          acc[date][device] = (acc[date][device] || 0) + count;
          acc[date].total += count;
          return acc;
        }, {});

        setData(Object.values(formattedData));

        const userId = jsonData.userData.id; 
        const userResponse = await axios.get(`http://localhost:8000/getUserData/${userId}`);
        const user = userResponse.data[0];
        user.totalLoginCount = jsonData.totalLoginCount; 
        setUserDetails(user);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user_login_id]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
      const channels = payload[0].payload.channels;
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}>
          <p>{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color, margin: '0', lineHeight: '1.2' }}>{`${entry.name}: ${entry.value}`}</p>
          ))}
          {Object.keys(channels).map((channel, index) => (
            <div key={`channel-${index}`}>
              <p><strong>{channel}</strong></p>
              {Object.keys(channels[channel]).map((device, i) => (
                <p key={`device-${i}`} style={{ margin: '0', lineHeight: '1.2' }}>{`${device}: ${channels[channel][device]}`}</p>
              ))}
            </div>
          ))}
          <p style={{ fontWeight: 'bold', margin: '0', lineHeight: '1.2' }}>{`Total login: ${total}`}</p>
        </div>
      );
    }
    return null;
  };

  const handleDeviceChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  const handleChannelChange = (e) => {
    setSelectedChannel(e.target.value);
  };

  const filteredData = data.filter(entry => {
    if (selectedDevice === 'all' && selectedChannel === 'all') return true;
    if (selectedDevice === 'all') return Object.keys(entry.channels).includes(selectedChannel);
    if (selectedChannel === 'all') return entry[selectedDevice] !== undefined;
    return Object.keys(entry.channels).includes(selectedChannel) && entry[selectedDevice] !== undefined;
  }).map(entry => {
    if (selectedChannel === 'all') {
      return entry;
    }
    const filteredEntry = { ...entry, channels: { [selectedChannel]: entry.channels[selectedChannel] }, total: 0 };
    Object.keys(filteredEntry.channels[selectedChannel]).forEach(device => {
      filteredEntry[device] = filteredEntry.channels[selectedChannel][device];
      filteredEntry.total += filteredEntry.channels[selectedChannel][device];
    });
    return filteredEntry;
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <div style={{ 
          marginTop: '60px',
          marginRight: '585px',
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '10px',
          width: '520px',
          textAlign: 'left',
          border: '1px solid #ccc',
        }}>
        <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '1px' }}>User Details</h3>
        <div style={{ paddingLeft: '20px' }}>
          <p style={{ margin: '10px 0' }}><strong>User Login ID:</strong> {user_login_id}</p>
          <p style={{ margin: '10px 0' }}><strong>Email:</strong> {userDetails.google_user_email}</p>
          <p style={{ margin: '10px 0' }}><strong>Name:</strong> {userDetails.user_name}</p>
          <p style={{ margin: '10px 0' }}><strong>Account Created:</strong> {new Date(userDetails.created_at).toLocaleDateString()}</p>
          <p style={{ margin: '10px 0' }}><strong>Last Login Date:</strong> {new Date(userDetails.updated_at).toLocaleDateString()}</p>
          <p style={{ margin: '10px 0' }}><strong>Total Login Count:</strong> {userDetails.totalLoginCount}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label htmlFor="device-select" style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '10px',color:'white',marginLeft:'600px' }}>Select Device:</label>
        <select id="device-select" value={selectedDevice} onChange={handleDeviceChange} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}>
          <option value="all">All</option>
          <option value="web">Web</option>
          <option value="M-web">M-Web</option>
          <option value="app-android">App-Android</option>
          <option value="app-ios">App-IOS</option>
        </select>

        <label htmlFor="channel-select" style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 10px',color:'white' }}>Select Channel:</label>
        <select id="channel-select" value={selectedChannel} onChange={handleChannelChange} style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}>
          <option value="all">All</option>
          <option value="hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Marathi">Marathi</option>
          <option value="Bengali">Bengali</option>
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginRight: '20px' }}>
          <BarChart
            width={500}
            height={300}
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            {selectedDevice === 'all' ? (
              <>
                <Bar dataKey="web" stackId="a" fill="#413ea0" barSize={20} />
                <Bar dataKey="M-web" stackId="a" fill="#ff7300" barSize={20} />
                <Bar dataKey="app-android" stackId="a" fill="#8884d8" barSize={20} />
                <Bar dataKey="app-ios" stackId="a" fill="#82ca9d" barSize={20} />
              </>
            ) : (
              <Bar dataKey={selectedDevice} stackId="a" fill="#413ea0" barSize={20} />
            )}
          </BarChart>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginLeft: '20px' }}>
          <LineChart
            width={500}
            height={300}
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            {selectedDevice === 'all' ? (
              <>
                <Line type="monotone" dataKey="web" stroke="#413ea0" strokeWidth={2} />
                <Line type="monotone" dataKey="M-web" stroke="#ff7300" strokeWidth={2} />
                <Line type="monotone" dataKey="app-android" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="app-ios" stroke="#82ca9d" strokeWidth={2} />
              </>
            ) : (
              <Line type="monotone" dataKey={selectedDevice} stroke="#413ea0" strokeWidth={2} />
            )}
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Rechart;
