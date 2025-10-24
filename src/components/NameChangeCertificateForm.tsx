import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface NameChangeData {
  lastNameBefore: string;
  firstNameBefore: string;
  middleNameBefore: string;
  lastNameAfter: string;
  firstNameAfter: string;
  middleNameAfter: string;
  birthDate: string;
  birthPlace: string;
  citizenship: string;
  passportSeries: string;
  passportNumber: string;
  reason: string;
  registrationDate: string;
  registrationPlace: string;
}

export const NameChangeCertificateForm = ({ onSave }: { onSave: () => void }) => {
  const [formData, setFormData] = useState<NameChangeData>({
    lastNameBefore: '',
    firstNameBefore: '',
    middleNameBefore: '',
    lastNameAfter: '',
    firstNameAfter: '',
    middleNameAfter: '',
    birthDate: '',
    birthPlace: '',
    citizenship: 'Российская Федерация',
    passportSeries: '',
    passportNumber: '',
    reason: '',
    registrationDate: '',
    registrationPlace: '',
  });

  const handleChange = (field: keyof NameChangeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.lastNameBefore || !formData.firstNameBefore || !formData.lastNameAfter || !formData.firstNameAfter) {
      toast.error('Заполните обязательные поля');
      return;
    }
    onSave();
    toast.success('Свидетельство о смене имени сохранено');
  };

  const handlePrint = () => {
    window.print();
    toast.info('Документ отправлен на печать');
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Прежние данные</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Фамилия *</Label>
            <Input 
              value={formData.lastNameBefore} 
              onChange={(e) => handleChange('lastNameBefore', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Имя *</Label>
            <Input 
              value={formData.firstNameBefore} 
              onChange={(e) => handleChange('firstNameBefore', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Отчество</Label>
            <Input 
              value={formData.middleNameBefore} 
              onChange={(e) => handleChange('middleNameBefore', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Новые данные</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Фамилия *</Label>
            <Input 
              value={formData.lastNameAfter} 
              onChange={(e) => handleChange('lastNameAfter', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Имя *</Label>
            <Input 
              value={formData.firstNameAfter} 
              onChange={(e) => handleChange('firstNameAfter', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Отчество</Label>
            <Input 
              value={formData.middleNameAfter} 
              onChange={(e) => handleChange('middleNameAfter', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Персональные данные</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Дата рождения</Label>
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
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Гражданство</Label>
            <Input 
              value={formData.citizenship} 
              onChange={(e) => handleChange('citizenship', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Серия паспорта</Label>
            <Input 
              value={formData.passportSeries} 
              onChange={(e) => handleChange('passportSeries', e.target.value)}
              placeholder="45 03"
            />
          </div>
          <div className="space-y-2">
            <Label>Номер паспорта</Label>
            <Input 
              value={formData.passportNumber} 
              onChange={(e) => handleChange('passportNumber', e.target.value)}
              placeholder="123456"
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Основание для изменения</h3>
        <Textarea 
          value={formData.reason} 
          onChange={(e) => handleChange('reason', e.target.value)}
          placeholder="Укажите причину смены имени (личное желание, вступление в брак, и т.д.)"
          rows={3}
        />
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
