import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Calendar,
  Title,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProviderListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';
import { Provider } from './types';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

const CreateAppointment: FunctionComponent = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();
  const routeParams = route.params as RouteParams;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedProvider, setSelectedProvider] = useState<string>(
    routeParams.providerId,
  );

  useEffect(() => {
    api.get(`providers`).then((response) => {
      setProviders(response.data);
    });
  }, [setProviders]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback(
    (providerId: string) => {
      setSelectedProvider(providerId);
    },
    [setSelectedProvider],
  );

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(!showDatePicker);
  }, [setShowDatePicker, showDatePicker]);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatarUrl }} />
      </Header>

      <ProviderListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatarUrl }} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProviderListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            onChange={handleDateChanged}
            display="calendar"
            textColor="#f4ede8"
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
