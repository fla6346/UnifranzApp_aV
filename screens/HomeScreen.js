import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ImageBackground 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');
  
  // Sample data
  const upcomingClasses = [
    { id: 1, subject: 'Ingenieria', time: '09:00 AM'},
  ];
  
  const assignments = [
    { id: 1, title: 'Titulo de Evento', subject: 'Matemáticas', dueDate: 'Mañana', completed: false },
    
  ];
  
  const announcements = [
    { id: 1, title: 'Recordatorio: Evento x', date: 'Hoy', content: 'Contenido' },
  ];

  return (
    <View style={styles.container}>
      {}
      <View
        style={styles.header}
      >
        <View style={styles.profileContainer}>
          <Image 
            source={require('../assets/logo.jpg')} 
            style={styles.avatar}
          />
          <View >
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <Text style={styles.userName}>User</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="white" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Today's schedule section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Eventos de Hoy</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classesContainer}>
            {upcomingClasses.map(item => (
              <TouchableOpacity 
                key={item.id}
                style={styles.classCard}
                onPress={() => navigation.navigate('ClassDetail', { class: item })}
              >
                <View style={[styles.classColorStrip, { backgroundColor: item.color }]} />
                <View style={styles.classInfo}>
                  <Text style={styles.classTime}>{item.time}</Text>
                  <Text style={styles.classSubject}>{item.subject}</Text>
                  <Text style={styles.classTeacher}>{item.teacher}</Text>
                  <View style={styles.roomContainer}>
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text style={styles.classRoom}>{item.room}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Assignments section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tareas Pendientes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          
          {assignments.map(item => (
            <TouchableOpacity 
              key={item.id}
              style={styles.assignmentItem}
              onPress={() => navigation.navigate('AssignmentDetail', { assignment: item })}
            >
              <View style={[
                styles.assignmentStatus, 
                { backgroundColor: item.completed ? '#4CAF50' : '#FF9800' }
              ]} />
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentTitle}>{item.title}</Text>
                <Text style={styles.assignmentSubject}>{item.subject}</Text>
              </View>
              <View style={styles.assignmentDueDate}>
                <Text style={[
                  styles.dueDateText, 
                  { color: item.dueDate === 'Mañana' ? '#F44336' : '#666' }
                ]}>
                  {item.dueDate}
                </Text>
                <Ionicons 
                  name={item.completed ? "checkmark-circle" : "time-outline"} 
                  size={20} 
                  color={item.completed ? "#4CAF50" : "#FF9800"} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Announcements section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Anuncios</Text>
          </View>
          
          {announcements.map(item => (
            <View key={item.id} style={styles.announcementCard}>
              <View style={styles.announcementHeader}>
                <Text style={styles.announcementTitle}>{item.title}</Text>
                <Text style={styles.announcementDate}>{item.date}</Text>
              </View>
              <Text style={styles.announcementContent}>{item.content}</Text>
            </View>
          ))}
        </View>
        
        {/* Resources grid */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recursos</Text>
          </View>
          
          <View style={styles.resourcesGrid}>
            <TouchableOpacity style={styles.resourceItem}>
              <View style={[styles.resourceIcon, { backgroundColor: '#E91E63' }]}>
                <FontAwesome5 name="book" size={24} color="white" />
              </View>
              <Text style={styles.resourceTitle}>Eventos Pasados</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceItem}>
              <View style={[styles.resourceIcon, { backgroundColor: '#9C27B0' }]}>
                <FontAwesome5 name="calendar-alt" size={24} color="white" />
              </View>
              <Text style={styles.resourceTitle}>Calendario</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceItem}>
              <View style={[styles.resourceIcon, { backgroundColor: '#00BCD4' }]}>
                <MaterialCommunityIcons name="file-document-outline" size={24} color="white" />
              </View>
              <Text style={styles.resourceTitle}>Documentos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceItem}>
              <View style={[styles.resourceIcon, { backgroundColor: '#4CAF50' }]}>
                <FontAwesome5 name="graduation-cap" size={24} color="white" />
              </View>
              <Text style={styles.resourceTitle}>Graduaciones</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Bottom padding */}
        <View style={{ height: 80 }} />
      </ScrollView>
      
      {/* Bottom navigation bar */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('home')}
        >
          <Ionicons 
            name={activeTab === 'home' ? "home" : "home-outline"} 
            size={24} 
            color={activeTab === 'home' ? '#3949ab' : '#666'} 
          />
          <Text style={[
            styles.navText, 
            { color: activeTab === 'home' ? '#3949ab' : '#666' }
          ]}>
            Inicio
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('calendar')}
        >
          <Ionicons 
            name={activeTab === 'calendar' ? "calendar" : "calendar-outline"} 
            size={24} 
            color={activeTab === 'calendar' ? '#3949ab' : '#666'} 
          />
          <Text style={[
            styles.navText, 
            { color: activeTab === 'calendar' ? '#3949ab' : '#666' }
          ]}>
            Calendario
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('chat')}
        >
          <Ionicons 
            name={activeTab === 'chat' ? "chatbubble" : "chatbubble-outline"} 
            size={24} 
            color={activeTab === 'chat' ? '#3949ab' : '#666'} 
          />
          <Text style={[
            styles.navText, 
            { color: activeTab === 'chat' ? '#3949ab' : '#666' }
          ]}>
            Chat
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons 
            name={activeTab === 'profile' ? "person" : "person-outline"} 
            size={24} 
            color={activeTab === 'profile' ? '#3949ab' : '#666'} 
          />
          <Text style={[
            styles.navText, 
            { color: activeTab === 'profile' ? '#3949ab' : '#666' }
          ]}>
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    marginLeft: 15,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#F44336',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  notificationCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#3949ab',
    fontSize: 14,
  },
  classesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  classCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 15,
    width: width * 0.7,
    height: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  classColorStrip: {
    width: 10,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  classInfo: {
    padding: 15,
    flex: 1,
  },
  classTime: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: 'bold',
  },
  classSubject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  classTeacher: {
    fontSize: 14,
    color: '#666',
  },
  roomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  classRoom: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  assignmentItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  assignmentStatus: {
    width: 5,
    borderRadius: 5,
    marginRight: 15,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  assignmentSubject: {
    fontSize: 14,
    color: '#666',
  },
  assignmentDueDate: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dueDateText: {
    fontSize: 14,
    marginBottom: 5,
  },
  announcementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  announcementDate: {
    fontSize: 14,
    color: '#666',
  },
  announcementContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resourceItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  resourceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomeScreen;