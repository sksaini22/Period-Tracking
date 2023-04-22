import { useState, useCallback, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  Cramps,
  DailyJournal,
  Flow,
  Sex,
  StartPeriod,
  Temperature,
  Weight,
} from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { List, Snackbar } from "react-native-paper";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PeriodTracker = () => {
  const [periodData, setPeriodData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [snackVisible, setSnackVisible] = useState(false); // state for showing/hiding the Snackbar
  const [snackMessage, setSnackMessage] = useState(""); // state for the Snackbar message

  const [journal, setJournal] = useState("");
  const handleJournalFormSubmit = useCallback(
    (newJournal) => {
      setJournal(newJournal);
    },
    [journal]
  );

  const [startPeriod, setStartPeriod] = useState(false);
  const handleStartPeriodFormSubmit = useCallback(() => {
    setStartPeriod((prevState) => !prevState);
  }, [startPeriod]);

  const [flow, setFlow] = useState(0);
  const handleFlowFormSubmit = useCallback(
    (newFlow) => {
      setFlow(newFlow);
    },
    [flow]
  );

  const [cramps, setCramps] = useState(0);
  const handleCrampsFormSubmit = useCallback(
    (newCramps) => {
      setCramps(newCramps);
    },
    [cramps]
  );

  const [isSex, setIsSex] = useState(false);
  const handleSexFormSubmit = useCallback(() => {
    setIsSex((prevState) => !prevState);
  }, [isSex]);

  const [weight, setWeight] = useState(null);
  const handleWeightFormSubmit = useCallback(
    (newWeight) => {
      if (newWeight < 0 || newWeight > 1000) {
        // check if weight is within a valid range
        setSnackMessage(
          "Invalid weight. Please enter a value between 0 and 1000."
        );
        setSnackVisible(true);
      } else {
        setWeight(newWeight);
      }
    },
    [weight]
  );

  const [temperature, setTemperature] = useState(null);
  const handleTemperatureFormSubmit = useCallback(
    (newTemperature) => {
      if (newTemperature && (newTemperature < 30 || newTemperature > 45)) {
        // check if temperature is within a valid range
        setSnackMessage(
          "Invalid temperature. Please enter a value between 30 and 45."
        );
        setSnackVisible(true);
      } else {
        setTemperature(newTemperature);
      }
    },
    [temperature]
  );

  const handleSnackbarDismiss = useCallback(() => {
    setSnackVisible(false);
  }, []);

  const handleSave = async () => {

    if(!journal.trim()){
      setSnackMessage("Please enter a journal entry.");
      setSnackVisible(true);
      return;
    }

    if (!selectedDate) {
      setSnackMessage("Please select a date.");
      setSnackVisible(true);
      return;
    }

    const data = {
      id: Date.now(),
      date: selectedDate,
      journal,
      startPeriod,
      flow,
      cramps,
      isSex,
      weight,
      temperature,
    };

    const prevEntry = await AsyncStorage.getItem(`@data`);
    const entries = prevEntry ? JSON.parse(prevEntry) : [];
    const existingEntryIndex = entries.findIndex(
      (entry) => entry.date === data.date
    );

    if (existingEntryIndex !== -1) {
      entries[existingEntryIndex] = data;
    } else {
      entries.push(data);
    }
    setPeriodData(entries);

    try {
      await AsyncStorage.setItem(`@data`, JSON.stringify(entries));
      setSnackMessage("Data saved successfully.");
      setSnackVisible(true);
    } catch (error) {
      setSnackMessage("Failed to save data.");
      setSnackVisible(true);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const prevEntry = await AsyncStorage.getItem(`@data`);
        const entries = prevEntry ? JSON.parse(prevEntry) : [];
        const periodForDate = entries.find(
          (entry) => entry.date === selectedDate
        );
        setPeriodData(entries);

        if (periodForDate) {
          setJournal(periodForDate.journal);
          setStartPeriod(periodForDate.startPeriod);
          setFlow(periodForDate.flow);
          setCramps(periodForDate.cramps);
          setIsSex(periodForDate.isSex);
          setWeight(periodForDate.weight);
          setTemperature(periodForDate.temperature);
        } else {
          setJournal("");
          setStartPeriod(false);
          setFlow(0);
          setCramps(0);
          setIsSex(false);
          setWeight(null);
          setTemperature(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log("selectedDate", selectedDate);
    console.log("startPeriod", startPeriod);
  }, [selectedDate]);

  const getMArkedDates = () => {
    const markedDates = {};
    periodData.forEach((entry) => {
      markedDates[entry.date] = {
        selected: true,
        marked: true,
        selectedDotColor: tw.color("sky-700"),
      };
    });
    return markedDates;
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAwareScrollView style={tw`p-4`}>
        <Text style={tw` text-xl font-bold text-center text-sky-700 border rounded-lg p-1 text-center border-sky-700`}>
         Date: {selectedDate}
        </Text>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={getMArkedDates()}
          style={tw`shadow-md rounded-lg m-1`}
        />
        <List.Section style={tw`my-2 bg-white rounded-lg shadow-md`}>
          <List.Accordion
            title="Daily Journal"
            left={(props) => (
              <List.Icon
                {...props}
                icon="notebook-edit"
                color={tw.color("sky-700")}
              />
            )}
            style={tw`bg-sky-100 shadow rounded-md`}
            titleStyle={tw`text-sky-700`}
          >
            <DailyJournal
              setJournal={handleJournalFormSubmit}
              journal={journal}
            />
            {journal.length === 0 && (
              <Text style={tw`text-red-600`}>Journal must not be empty.</Text>
            )}
          </List.Accordion>
        </List.Section>

        <StartPeriod
          setIsPeriod={handleStartPeriodFormSubmit}
          isPeriod={startPeriod}
        />

        <Flow setFlow={handleFlowFormSubmit} flow={flow} />

        <Cramps setCramps={handleCrampsFormSubmit} cramps={cramps} />

        <Sex setIsSex={handleSexFormSubmit} isSex={isSex} />

        <List.Section>
          <List.Accordion
            title="Temperature"
            left={(props) => (
              <List.Icon
                {...props}
                icon="notebook-edit"
                color={tw.color("sky-700")}
              />
            )}
            style={tw`bg-sky-100 shadow rounded-md`}
            titleStyle={tw`text-sky-700`}
          >
            <Temperature
              setTemperature={handleTemperatureFormSubmit}
              temperature={temperature}
            />
            {temperature !== null && isNaN(temperature) && (
              <Text style={tw`text-red-600`}>Invalid temperature entered.</Text>
            )}
          </List.Accordion>
        </List.Section>

        <List.Section style={tw`my-1`}>
          <List.Accordion
            title="Weight"
            left={(props) => (
              <List.Icon {...props} icon="note" color={tw.color("sky-700")} />
            )}
            style={tw`bg-sky-100 shadow rounded-md`}
            titleStyle={tw`text-sky-700`}
          >
            <Weight setWeight={handleWeightFormSubmit} weight={weight} />
            {weight !== null && isNaN(weight) && (
              <Text style={tw`text-red-600`}>Invalid weight entered.</Text>
            )}
          </List.Accordion>
        </List.Section>
        <View style={tw`my-4`}>
          <TouchableOpacity
            style={tw`bg-sky-500 rounded-md py-2`}
            onPress={handleSave}
          >
            <Text style={tw`text-white text-center text-lg`}>Save</Text>
          </TouchableOpacity>
          <Snackbar
            visible={snackVisible}
            onDismiss={handleSnackbarDismiss}
            action={{
              label: "Dismiss",
              onPress: () => {
                setSnackVisible(false);
              },
            }}
          >
            {snackMessage}
          </Snackbar>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PeriodTracker;
