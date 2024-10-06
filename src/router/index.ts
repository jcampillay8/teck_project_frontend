// Installed Utils
import { createRouter, createWebHistory } from 'vue-router';
import DOMPurify from 'dompurify';

// App Utils
import { useToken } from '@/composables/useToken';
import { useUserStore } from '@/stores/useUserStore';
import { useSocialStore } from '@/stores/useSocialStore';
import AuthLayout from '../layout/AuthLayout.vue';
import HomeLayout from '../layout/HomeLayout.vue'; // Importa HomeLayout
import SignInView from '../views/auth/SignInView.vue';
import RegistrationView from '../views/auth/RegistrationView.vue';
import ResetPasswordView from '../views/auth/ResetPasswordView.vue';
import ChangePasswordView from '../views/auth/ChangePasswordView.vue';
import GoogleConnectView from '../views/auth/GoogleConnectView.vue';
import MainView from '../views/home/MainView.vue';

// Importa las vistas que mencionaste
// import SkillPracticeHomeView from '../views/skill_practice/SkillPracticeHomeView.vue';
import UploadDataView from '../views/upload_data/UploadDataHomeView.vue';
import ProgressTrackingView from '../views/progress_tracking/ProgressTrackingHomeView.vue';
import AboutView from '../views/about/AboutHomeView.vue';
import ContactView from '../views/contact/ContactHomeView.vue';

import UploadData01 from '../views/upload_data/Upload_Data_01.vue';
import UploadData02 from '../views/upload_data/Upload_Data_02.vue';
import NewStructure from '../views/upload_data/New_Structure_Data.vue';

// import Skill_Practice01 from '../views/skill_practice/Skill_Practice_01.vue';
// import Skill_Practice02 from '../views/skill_practice/Skill_Practice_02.vue';
// import Skill_Practice03 from '../views/skill_practice/Skill_Practice_03.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: AuthLayout,
      children: [
        { path: '', component: SignInView, meta: { noAuth: true } },
        { path: 'registration', component: RegistrationView, meta: { noAuth: true } },
        { path: 'reset-password', component: ResetPasswordView, meta: { noAuth: true } },
        { path: 'change-password/:token', component: ChangePasswordView, meta: { noAuth: true } },
        {
          path: 'google/connect',
          component: GoogleConnectView,
          meta: { socialAuth: true },
          props: (route) => ({
            failedMessage: route.meta.failedMessage || undefined
          })
        }
      ]
    },
    {
      path: '/home',
      component: HomeLayout,
      children: [
        { path: '', component: MainView, meta: { requiresAuth: true } },
        { path: 'progress-tracking', component: ProgressTrackingView, meta: { requiresAuth: true } },
        { path: 'about', component: AboutView, meta: { requiresAuth: true } },
        { path: 'contact', component: ContactView, meta: { requiresAuth: true } }
      ]
    },
    {
      path: '/upload-data',
      component: HomeLayout,
      children: [
        { path: '', component: UploadDataView, meta: { requiresAuth: true } },
        { path: 'upload_data_01', component: UploadData01, meta: { requiresAuth: true } }, 
        { path: 'upload_data_02', component: UploadData02, meta: { requiresAuth: true } }, 
        { path: 'new-structure', component: NewStructure, meta: { requiresAuth: true } }, 
      ]
    },
    // {
    //   path: '/upload-data',
    //   component: HomeLayout,
    //   children: [
    //     { path: '', component: UploadDataView, meta: { requiresAuth: true } }, 
    //     { path: 'skill_practice_01', component: Skill_Practice01, meta: { requiresAuth: true } }, 
    //     { path: 'skill_practice_02', component: Skill_Practice02, meta: { requiresAuth: true } }, 
    //     {
    //       path: 'practice/:id', 
    //       name: 'Practice', 
    //       component: () => import('@/views/skill_practice/TitleDetail.vue'), 
    //       meta: { requiresAuth: true }
    //     }
    //   ]
    // },
    
    {
      path: '/logout',
      component: { template: '<div></div>' },
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        userStore.logout();
        next('/');
      }
    }
  ]
});

// Register an interceptor
router.beforeEach(async (to, from, next) => {
  const { token, clearToken } = useToken();
  if (to.meta.noAuth) {
    if (token.value) {
      next('/home');
      return;
    }
  } else if (to.meta.requiresAuth) {
    const userStore = useUserStore();
    if (!userStore.userData) {
      await userStore.fetchUserData();
    }
    console.log('User data:', userStore.userData);
    if (!userStore.userData) {
      clearToken();
      next('/');
    } else {
      next();
    }
    return;
  } else if (to.meta.socialAuth) {
    const code = to.query.code || undefined;
    if (typeof code !== 'string') {
      to.meta.failedMessage = 'The authorization code is missing.';
      next();
      return;
    }
    const socialStore = useSocialStore();
    const userStore = useUserStore();
    await socialStore.exchangeAuthorizationCode(DOMPurify.sanitize(code));
    if (socialStore.errorMessage) {
      to.meta.failedMessage = socialStore.errorMessage;
    }
    if (userStore.userData) {
      next('/home');
    } else {
      next();
    }
    return;
  }
  next();
});

export default router;
