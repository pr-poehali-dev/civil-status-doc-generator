import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface BirthData {
  childLastName: string;
  childFirstName: string;
  childMiddleName: string;
  birthDate: string;
  birthPlace: string;
  motherLastName: string;
  motherFirstName: string;
  motherMiddleName: string;
  motherBirthDate: string;
  fatherLastName: string;
  fatherFirstName: string;
  fatherMiddleName: string;
  fatherBirthDate: string;
  registrationDate: string;
  registrationPlace: string;
}

export const BirthCertificateForm = ({ onSave }: { onSave: () => void }) => {
  const [formData, setFormData] = useState<BirthData>({
    childLastName: '',
    childFirstName: '',
    childMiddleName: '',
    birthDate: '',
    birthPlace: '',
    motherLastName: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherBirthDate: '',
    fatherLastName: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherBirthDate: '',
    registrationDate: '',
    registrationPlace: '',
  });

  const handleChange = (field: keyof BirthData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.childLastName || !formData.childFirstName || !formData.birthDate) {
      toast.error('Заполните обязательные поля');
      return;
    }
    onSave();
    toast.success('Свидетельство о рождении сохранено');
  };

  const handlePrint = () => {
    window.print();
    toast.info('Документ отправлен на печать');
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о ребенке</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Фамилия *</Label>
            <Input 
              value={formData.childLastName} 
              onChange={(e) => handleChange('childLastName', e.target.value)}
              placeholder="Иванов"
            />
          </div>
          <div className="space-y-2">
            <Label>Имя *</Label>
            <Input 
              value={formData.childFirstName} 
              onChange={(e) => handleChange('childFirstName', e.target.value)}
              placeholder="Иван"
            />
          </div>
          <div className="space-y-2">
            <Label>Отчество</Label>
            <Input 
              value={formData.childMiddleName} 
              onChange={(e) => handleChange('childMiddleName', e.target.value)}
              placeholder="Иванович"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Дата рождения *</Label>
            <Input 
              type="date" 
              value={formData.birthDate} 
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Место рождения</Label>
            <Input 
              value={formData.birthPlace} 
              onChange={(e) => handleChange('birthPlace', e.target.value)}
              placeholder="г. Москва"
            />
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о матери</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Фамилия</Label>
            <Input 
              value={formData.motherLastName} 
              onChange={(e) => handleChange('motherLastName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Имя</Label>
            <Input 
              value={formData.motherFirstName} 
              onChange={(e) => handleChange('motherFirstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Отчество</Label>
            <Input 
              value={formData.motherMiddleName} 
              onChange={(e) => handleChange('motherMiddleName', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Label>Дата рождения</Label>
          <Input 
            type="date" 
            className="w-64"
            value={formData.motherBirthDate} 
            onChange={(e) => handleChange('motherBirthDate', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения об отце</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Фамилия</Label>
            <Input 
              value={formData.fatherLastName} 
              onChange={(e) => handleChange('fatherLastName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Имя</Label>
            <Input 
              value={formData.fatherFirstName} 
              onChange={(e) => handleChange('fatherFirstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Отчество</Label>
            <Input 
              value={formData.fatherMiddleName} 
              onChange={(e) => handleChange('fatherMiddleName', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Label>Дата рождения</Label>
          <Input 
            type="date" 
            className="w-64"
            value={formData.fatherBirthDate} 
            onChange={(e) => handleChange('fatherBirthDate', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о регистрации</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Дата регистрации</Label>
            <Input 
              type="date" 
              value={formData.registrationDate} 
              onChange={(e) => handleChange('registrationDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Место регистрации</Label>
            <Input 
              value={formData.registrationPlace} 
              onChange={(e) => handleChange('registrationPlace', e.target.value)}
              placeholder="Отдел ЗАГС г. Москвы"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button onClick={handleSave} className="gap-2">
          <Icon name="Save" size={16} />
          Сохранить
        </Button>
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <Icon name="Printer" size={16} />
          Печать на бланк
        </Button>
        <Button variant="outline" className="gap-2">
          <Icon name="FileCheck" size={16} />
          Отправить на проверку
        </Button>
      </div>
    </div>
  );
};
