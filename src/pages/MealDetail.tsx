import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMealById } from '@/services/realMealDatabase';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meal = getMealById(id || '');

  if (!meal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Meal not found</h1>
          <Button onClick={() => navigate('/dashboard')} className="bg-bodify-gradient">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar activeTab="recipes" onTabChange={() => {}} />
          <main className="flex-1 overflow-hidden">
            <div className="pt-32 pb-20">
              <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="mb-6 border-white/20 hover:bg-white/10"
                  >
                    <ArrowLeft className="mr-2" size={16} />
                    Back to Dashboard
                  </Button>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <img 
                        src={meal.image} 
                        alt={meal.title}
                        className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                      />
                    </div>

                    <div>
                      <h1 className="text-4xl font-bold mb-4">{meal.title}</h1>
                      <div className="flex items-center space-x-6 text-white/70">
                        <div className="flex items-center">
                          <Clock size={18} className="mr-2" />
                          <span>20 mins</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={18} className="mr-2" />
                          <span>1 serving</span>
                        </div>
                        <div className="flex items-center">
                          <ChefHat size={18} className="mr-2" />
                          <span>Easy</span>
                        </div>
                      </div>

                      <Card className="mt-6 bg-white/5 border-white/10">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-4">Nutrition Facts</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-white/10 rounded-lg">
                              <div className="text-2xl font-bold text-bodify-orange">{meal.calories}</div>
                              <div className="text-sm text-white/70">Calories</div>
                            </div>
                            <div className="text-center p-3 bg-white/10 rounded-lg">
                              <div className="text-2xl font-bold text-bodify-purple">{meal.protein}g</div>
                              <div className="text-sm text-white/70">Protein</div>
                            </div>
                            <div className="text-center p-3 bg-white/10 rounded-lg">
                              <div className="text-2xl font-bold text-green-400">{meal.carbs}g</div>
                              <div className="text-sm text-white/70">Carbs</div>
                            </div>
                            <div className="text-center p-3 bg-white/10 rounded-lg">
                              <div className="text-2xl font-bold text-yellow-400">{meal.fat}g</div>
                              <div className="text-sm text-white/70">Fat</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="glassmorphism border-0">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Ingredients</h3>
                        <ul className="space-y-2">
                          {meal.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-bodify-orange rounded-full mr-3"></div>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism border-0">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Instructions</h3>
                        <ol className="space-y-3">
                          {meal.instructions.map((instruction, index) => (
                            <li key={index} className="flex">
                              <span className="bg-bodify-gradient text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                                {index + 1}
                              </span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default MealDetail;
