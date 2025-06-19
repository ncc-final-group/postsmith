'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const PostSmiths: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    userId: 5,
    name: '',
    nickname: '',
    description: '',
    address: '',
    logoImage: '',
  });

  const [fileData, setFileData] = useState<{
    logoImage: File | null;
  }>({ logoImage: null });

  const [isCreating, setIsCreating] = useState(false);

  const fetchBlogs = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/blogmanage/userId/5`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        if (data.length === 0) {
          setSelectedBlog(null);
          setIsCreating(true);
        } else {
          setSelectedBlog(data[0]);
          setIsCreating(false);
        }
      })
      .catch(() => {
        alert('블로그 데이터를 불러오지 못했습니다.');
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (selectedBlog) {
      setFormData({
        userId: selectedBlog.user_id ?? '',
        name: selectedBlog.name ?? '',
        nickname: selectedBlog.nickname ?? '',
        description: selectedBlog.description ?? '',
        address: selectedBlog.address ?? '',
        logoImage: selectedBlog.logoImage ?? '',
      });
      setFileData({ logoImage: null });
    } else if (isCreating) {
      setFormData({
        userId: 5,
        name: '',
        nickname: '',
        description: '',
        address: '',
        logoImage: '',
      });
      setFileData({ logoImage: null });
    }
  }, [selectedBlog, isCreating]);

  const handleSelectBlog = (blog: any) => {
    setSelectedBlog(blog);
    setIsCreating(false);
    setFileData({ logoImage: null });
  };

  const handleCreateNew = () => {
    setSelectedBlog(null);
    setIsCreating(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    form.append('altText', '블로그 로고 이미지');
    form.append('userId', String(5));
    form.append('blogId', String(selectedBlog?.id ?? 0));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/upload/image`, {
        method: 'POST',
        body: form,
      });
      if (!res.ok) throw new Error('이미지 업로드 실패');
      const data = await res.json();
      return data.url;
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
      return null;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileData({ logoImage: file });
    }
  };

  const handleSaveChanges = async () => {
    let finalLogoImage = formData.logoImage;

    if (fileData.logoImage) {
      const uploadedUrl = await uploadImage(fileData.logoImage);
      if (uploadedUrl) {
        finalLogoImage = uploadedUrl;
      } else {
        return;
      }
    }

    const logoImageToSave = finalLogoImage || '/defaultimage.png';

    if (isCreating) {
      const dataToSend = { ...formData, logoImage: logoImageToSave };

      fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/blogmanage/create/userId/${formData.userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error('Failed to create blog');
          return await res.json();
        })
        .then((newBlog) => {
          setIsCreating(false);
          fetchBlogs();
          setSelectedBlog(newBlog);
          alert('새 블로그가 생성되었습니다.');
        })
        .catch(() => {
          alert('블로그 생성에 실패했습니다.');
        });
    } else {
      if (!selectedBlog) return;

      const updatedBlog = {
        ...selectedBlog,
        user_id: formData.userId,
        name: formData.name,
        nickname: formData.nickname,
        description: formData.description,
        address: formData.address,
        logoImage: logoImageToSave,
      };

      fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/blogmanage/update/${selectedBlog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBlog),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to update blog');
          return res.text();
        })
        .then(() => {
          alert('변경사항이 저장되었습니다.');
          fetchBlogs();
        })
        .catch(() => {
          alert('저장에 실패했습니다.');
        });
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-8">
      <div className="flex min-h-screen flex-col gap-4">
        <div className="min-w-6xl">
          <div className="mt-auto flex flex-col items-start gap-4 border border-gray-300 bg-white p-4">
            <div className="flex w-full flex-row items-center justify-between">
              <h1 className="text-xl text-gray-800">운영 중인 블로그</h1>
              <button onClick={handleCreateNew} className="text-xl text-gray-800">
                +
              </button>
            </div>
            <div className="flex w-full flex-col items-center">
              {blogs.length === 0 ? (
                <div className="mt-4 flex self-start text-base text-gray-500">운영중인 블로그가 없습니다. 블로그를 만들어 보세요.</div>
              ) : (
                blogs.map((blog, index) => {
                  const isSelected = blog === selectedBlog && !isCreating;
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelectBlog(blog)}
                      className={`flex w-full cursor-pointer items-center gap-4 rounded-md p-2 transition ${isSelected ? 'bg-gray-100' : ''}`}
                    >
                      <figure className="relative min-h-20 min-w-20 overflow-hidden rounded-full bg-gray-200">
                        <Image fill style={{ objectFit: 'contain' }} priority src={blog.logoImage || '/defaultimage.png'} alt="logo" />
                      </figure>
                      <div className="flex w-full gap-4">
                        <div className="flex w-120 flex-col justify-center">
                          <div className="text-base font-medium">{blog.nickname}</div>
                          <div className="text-base font-medium">{blog.address}</div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex flex-row">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              if (process.env.NEXT_PUBLIC_HOME_URL) {
                                window.open(`http://${blog.address}.postsmith/blog`, '_blank');
                              }
                            }}
                            className="mr-4"
                            style={{ cursor: 'pointer' }}
                          >
                            <Image src="/home.svg" alt="설정 아이콘" width={36} height={36} />
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              if (process.env.NEXT_PUBLIC_HOME_URL) {
                                window.open(`http://${blog.address}.postsmith/usermanage`, '_blank');
                              }
                            }}
                            className="mr-4"
                            style={{ cursor: 'pointer' }}
                          >
                            <Image src="/setting.svg" alt="설정 아이콘" width={36} height={36} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="min-w-6xl pt-1">
          <div className="flex flex-col items-start gap-8 border border-gray-300 bg-white p-4">
            <h1 className="text-xl text-gray-800">{isCreating || blogs.length === 0 ? '새 블로그 만들기' : '블로그 관리'}</h1>
            <label className="relative h-64 w-64 cursor-pointer self-center overflow-hidden rounded-full bg-gray-200">
              <Image
                fill
                style={{ objectFit: 'contain' }}
                priority
                src={fileData.logoImage ? URL.createObjectURL(fileData.logoImage) : formData.logoImage || '/defaultimage.png'}
                alt="logo"
              />
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>

            <div className="flex w-full flex-col gap-4">
              {(['name', 'nickname', 'description'] as const).map((field) => (
                <div key={field} className="flex w-full flex-col gap-2 px-8">
                  <label className="text-base">{`블로그 ${field === 'name' ? '이름' : field === 'nickname' ? '닉네임' : '설명'}`}</label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field === 'name' ? '블로그 이름을 입력하세요' : field === 'nickname' ? '블로그 닉네임을 입력하세요' : '블로그에 대한 설명을 입력하세요'}
                    className="w-full rounded-md border border-gray-500 p-2 focus:ring-0 focus:outline-none"
                  />
                </div>
              ))}

              {(isCreating || blogs.length === 0) && (
                <div className="flex w-full flex-col gap-2 px-8">
                  <label className="text-base">블로그 주소</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="예: www.postsmith.com"
                    className="w-full rounded-md border border-gray-500 p-2 focus:ring-0 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 border border-gray-300 bg-gray-200 px-12 py-4">
            <button onClick={handleSaveChanges} className="rounded-md border border-gray-500 px-8 py-1">
              변경사항 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSmiths;
