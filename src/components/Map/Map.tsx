import React, { useContext } from 'react';
import { Box, CircularProgress, Flex, Text } from '@chakra-ui/react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { UserLocationContext } from '../../context/UserLocation';
import { PlaygroundType } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

type MapProps = {
  playgrounds: PlaygroundType[];
};

const Map = ({ playgrounds }: MapProps) => {
  const navigate = useNavigate();
  const { latitude, longitude } = useContext(UserLocationContext);

  const handlePopupNavigateToPlayground = (playground: PlaygroundType) =>
    navigate(`playgrounds/${playground.id}`);

  if (!latitude || !longitude) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        background="rgba(255, 255, 255, 0.7)"
        zIndex="999"
      >
        <CircularProgress
          color="teal.500"
          size={12}
          thickness={10}
          isIndeterminate
        />
      </Flex>
    );
  }

  return (
    <Box>
      {!playgrounds && (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100vh"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          background="rgba(255, 255, 255, 0.7)"
          zIndex="999"
        >
          <CircularProgress
            color="teal.500"
            size={12}
            thickness={10}
            isIndeterminate
          />
        </Flex>
      )}
      <MapContainer
        style={{ height: `calc(100vh - 80px)`, width: '100%' }}
        center={[latitude ?? 47.497913, longitude ?? 19.040236]}
        zoom={8}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {playgrounds.map((playground) => (
          <Marker
            key={playground.id}
            position={[playground.latitude, playground.longitude]}
          >
            <Popup>
              <Box
                cursor="pointer"
                onClick={() => handlePopupNavigateToPlayground(playground)}
              >
                <Text color="#1B4965" fontSize="16px" fontWeight={800}>
                  {playground.name}
                </Text>
                <Text>{playground.address}</Text>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;
